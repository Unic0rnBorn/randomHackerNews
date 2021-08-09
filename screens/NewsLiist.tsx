import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { View, ScrollView, StyleSheet, Button } from "react-native";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import { getData, Story, User } from "../store/actions";

export interface PropStory extends Story {
  authKarma: User["karma"];
}

interface Store extends DefaultRootState {
  stories: PropStory[];
}

export default function HomeScreen() {
  const [stories, setStories] = useState<PropStory[] | []>([]);
  const storedStories = useSelector((store: Store) => store.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    setStories(storedStories);
  }, [storedStories]);

  if (!storedStories.length) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {stories.map((story) => (
          <CardItem story={story} />
        ))}
      </View>
      <View style={styles.generate}>
        <Button title='Generate news' onPress={() => dispatch(getData())} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  generate: {
    marginVertical: 24,
  },
});
