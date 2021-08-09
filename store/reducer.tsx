import { PropStory } from "../screens/NewsLiist";
import { GET_STORIES } from "./actions";

const initialState = {
  stories: [] as PropStory[] | [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_STORIES:
      return { stories: action.stories };
    default:
      return state;
  }
};

export default reducer;
