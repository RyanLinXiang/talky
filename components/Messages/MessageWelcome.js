import React from "react";
import { Text, StyleSheet } from "react-native";

const MessageWelcome = (props) => {
  return (
    <Text style={styles.message}>
      {props.username} has entered the room ...
    </Text>
  );
};

export default MessageWelcome;

const styles = StyleSheet.create({
  message: {
    fontFamily: "Avenir",
    color: "lightgrey",
    fontSize: 16,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgrey",
    padding: 5,
    width: "100%",
    marginBottom: 5,
  },
});
