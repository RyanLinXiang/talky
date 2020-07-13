import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const Settings = (props) => {
  const { handlerDisconnect } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          name="times-circle"
          type="font-awesome-5"
          onPress={handlerDisconnect}
          color="#64DFCA"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: "90%",
    alignItems: "flex-end",
  },
});

export default Settings;
