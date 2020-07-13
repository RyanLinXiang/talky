import React from "react";
import { Text, StyleSheet } from "react-native";

const MessageDefault = (props) => {
  const { username, message, align, me } = props;
  const color = align === "flex-end" ? "#64DFCA" : "#0A308E";
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
      {me ? message : username + " : " + message}
    </Text>
  );
};

export default MessageDefault;
