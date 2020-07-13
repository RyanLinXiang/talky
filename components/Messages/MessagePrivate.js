import React from "react";
import { Text, StyleSheet } from "react-native";

const MessagePrivate = (props) => {
  const { username, message, privateToUserName, align, me } = props;
  const color = align === "flex-end" ? "lightcoral" : "crimson";
  const styles = StyleSheet.create({
    message: {
      fontFamily: "Avenir",
      color: color,
      fontSize: 16,
      alignSelf: align,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: color,
      padding: 5,
      marginBottom: 5,
    },
  });
  return (
    <Text style={styles.message}>
      {me
        ? "to " + privateToUserName + " : " + message
        : username + " to " + privateToUserName + " : " + message}
    </Text>
  );
};

export default MessagePrivate;
