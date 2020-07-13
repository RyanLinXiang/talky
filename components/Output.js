import React from "react";
import MessageDefault from "./Messages/MessageDefault";
import MessageWelcome from "./Messages/MessageWelcome";
import MessagePrivate from "./Messages/MessagePrivate";
import MessageGoodbye from "./Messages/MessageGoodbye";
import { View, StyleSheet } from "react-native";

const Output = (props) => {
  let messages = [];
  let align;
  let me = false;

  props.contents.forEach((e, i) => {
    if (e.username === props.username) {
      align = "flex-end";
      me = true;
    } else {
      align = "flex-start";
      me = false;
    }

    switch (e.type) {
      case "message":
        messages.push(<MessageDefault {...e} key={i} align={align} me={me} />);
        break;
      case "messageWelcome":
        messages.push(<MessageWelcome {...e} key={i} />);
        break;
      case "messageGoodbye":
        messages.push(<MessageGoodbye {...e} key={i} />);
        break;
      case "messagePrivate":
        messages.push(<MessagePrivate {...e} key={i} align={align} me={me} />);
        break;
      default:
        return null;
    }
  });

  return <View style={styles.container}>{messages}</View>;
};

export default Output;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "90%",
    overflow: "scroll",
  },
});
