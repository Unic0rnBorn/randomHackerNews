import React from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { PropStory } from "../screens/NewsLiist";

interface Props {
  story: PropStory;
}

const CardItem = (props: Props) => {
  const date = new Date(props.story.time * 1000).toUTCString();
  return (
    <View style={styles.cardContainer} key={props.story.id}>
      <Text style={styles.title}>Title: {props.story.title}</Text>
      <Text style={styles.defaultInfo}>by {props.story.by}</Text>
      <Text style={styles.date}>Published on {date}</Text>
      <View style={styles.popularity}>
        <Text style={styles.defaultInfo}>score: {props.story.score}</Text>
        <Text style={styles.defaultInfo}>
          Author karma: {props.story.authKarma}
        </Text>
      </View>

      <View style={styles.action}>
        <Button
          title='Read here'
          onPress={() => Linking.openURL(props.story.url)}
        />
      </View>
    </View>
  );
};
export default CardItem;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingHorizontal: 24,
    width: "90%",
    flexDirection: "column",
    borderRadius: 8,
    backgroundColor: "#dddddd",
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    color: "#333333",
    paddingVertical: 24,
  },
  defaultInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  date: {
    paddingVertical: 24,
  },
  popularity: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    marginVertical: 24,
  },
});
