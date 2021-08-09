import axios from "axios";
export const GET_STORIES = "GET_STORIES";

export interface User {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

export interface Story {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}

export const getData = () => {
  return async (dispatch: any) => {
    const topStoriesId = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const topStoriesIds = await topStoriesId.data;
    const randomIds = [];
    while (randomIds.length < 10) {
      const r = Math.floor(Math.random() * topStoriesIds.length);
      if (randomIds.indexOf(r) === -1) randomIds.push(topStoriesIds[r]);
    }

    const promisedStories = await randomIds.map(async (item: string) => {
      const story = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json`
      );

      return story.data as Story;
    });

    Promise.all(promisedStories).then((storiesResponse) => {
      const usersIds = storiesResponse.map((story) => story.by);

      const mappedUsers = usersIds.map(async (userId) => {
        const user = await axios.get(
          `https://hacker-news.firebaseio.com/v0/user/${userId}.json`
        );
        return user.data as User;
      });

      Promise.all(mappedUsers).then((usersResponse) => {
        const users = usersResponse.map((user) => {
          return { id: user.id, karma: user.karma };
        });
        const data = storiesResponse.map((story) => {
          const user = users.find((user) => user.id === story.by)!;
          return {
            ...story,
            authKarma: user.karma,
          };
        });
        dispatch({
          type: GET_STORIES,
          stories: data,
        });
      });
    });
  };
};
