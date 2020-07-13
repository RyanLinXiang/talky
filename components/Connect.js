import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Picker,
} from "react-native";
import Form from "react-native-form";

export default class Connect extends Component {
  FormRef = React.createRef();

  handlerSubmit = () => {
    const { username, rooms } = this.FormRef.current.getValues();

    this.props.handlerConnect(username, rooms);
  };

  render() {
    const { rooms } = this.props;

    return (
      <View>
        <Image source={require("../assets/logo.png")} />
        <Text style={styles.logoText}>
          <Text style={styles.colorA}>Talk</Text>
          <Text style={styles.colorB}>Y</Text>
        </Text>
        <Form ref={this.FormRef}>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your name"
            type="TextInput"
            name="username"
          />
          <Picker itemStyle={styles.picker} type="Picker" name="rooms">
            <Picker.Item label="Choose a room" />
            {rooms.map((e, i) => (
              <Picker.Item key={i} label={e.room} value={i + 1} />
            ))}
          </Picker>
          <Button
            style={(styles.inputs, styles.colorB)}
            title="Join"
            type="submit"
            onPress={this.handlerSubmit}
          />
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "Avenir",
    fontSize: 75,
    textAlign: "center",
    marginBottom: 10,
  },
  colorA: { color: "#0A308E" },
  colorB: { color: "#64DFCA" },
  inputs: { fontFamily: "Avenir", fontSize: 18, textAlign: "center" },
  picker: { fontFamily: "Avenir", fontSize: 18, height: 80 },
});
