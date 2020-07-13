import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Connect from "./components/Connect";
import Inputs from "./components/Inputs";
import Output from "./components/Output";
import Settings from "./components/Settings";
import wsUrl from "./wsUrl";

export default class App extends Component {
  url = wsUrl;
  state = {
    connection: false,
    output: [],
  };

  websocket = false;
  roomid = false;
  username = false;
  userid = false;
  rooms = [];
  usersInRoom = [];

  initializeWebSocket() {
    this.websocket = new WebSocket(this.url);
    this.websocket.addEventListener("message", (evt) => {
      const data = JSON.parse(evt.data);
      this.rooms = data.rooms;
      this.websocket.close();
      this.setState({ connection: false, output: [] });
    });
  }

  componentDidMount() {
    this.initializeWebSocket();
  }

  UNSAFE_componentWillMount() {
    if (this.websocket) this.websocket.close();
  }

  handlerConnect = (username, roomid) => {
    this.username = username;
    this.roomid = +roomid;

    if (this.roomid > -1 && this.username) {
      this.websocket = new WebSocket(
        this.url,
        encodeURIComponent(this.roomid + "," + this.username)
      );

      this.websocket.addEventListener("message", (evt) => {
        const data = JSON.parse(evt.data);

        // if message is not sent in the context of the initial load/disconnect of the website and not in the context of the "Connect" button hit:
        if (
          !data.roomsOverview &&
          !data.disconnect &&
          !data.initialConnect &&
          !data.privateToUserId
        ) {
          this.usersInRoom = updateUsers(this.userid);
          this.setState({
            output: this.state.output.concat([
              {
                type: "message",
                username: data.username,
                message: data.message,
                privateToUserName: false,
              },
            ]),
          });
        } else if (data.initialConnect) {
          // only set it once
          if (!this.userid) {
            this.userid = data.userid;
            this.usersInRoom = updateUsers(this.userid);
            this.setState({
              connection: true,
              output: [
                {
                  type: "messageWelcome",
                  username: data.username,
                  message: false,
                  privateToUserName: false,
                },
              ],
            });
          }

          if (data.userid !== this.userid) {
            this.usersInRoom = updateUsers(this.userid);
            this.setState({
              connection: true,
              output: this.state.output.concat([
                {
                  type: "messageWelcome",
                  username: data.username,
                  message: false,
                  privateToUserName: false,
                },
              ]),
            });
          }
        } else if (data.privateToUserId) {
          let tousername = data.usersInRoom.filter(
            (e) => e.userid === data.privateToUserId
          )[0].username;

          tousername = data.privateToUserId === this.userid ? "me" : tousername;

          this.usersInRoom = updateUsers(this.userid);
          this.setState({
            output: this.state.output.concat([
              {
                type: "messagePrivate",
                username: data.username,
                message: data.message,
                privateToUserName: tousername,
              },
            ]),
          });
        } else if (data.disconnect) {
          this.usersInRoom = updateUsers(this.userid);
          this.setState({
            output: this.state.output.concat([
              {
                type: "messageGoodbye",
                username: data.username,
                message: false,
                privateToUserName: false,
              },
            ]),
          });
        }

        function updateUsers(userid) {
          const usersInRoom = [];
          if (data.usersInRoom)
            data.usersInRoom.forEach((e) => {
              if (+e.userid !== +userid)
                usersInRoom.push({
                  userid: e.userid,
                  username: e.username,
                });
            });

          return usersInRoom;
        }
      });
    }
  };

  handlerSend = (message, privateToUserId) => {
    privateToUserId = privateToUserId ? privateToUserId : false;
    if (message) {
      const messagetext = {
        room: this.roomid,
        userid: this.userid,
        message: message,
        privateToUserId: +privateToUserId,
      };

      this.websocket.send(JSON.stringify(messagetext));
    }
  };

  handlerDisconnect = () => {
    this.websocket.close();
    this.websocket = false;
    this.roomid = false;
    this.username = false;
    this.userid = false;
    this.usersInRoom = [];
    this.initializeWebSocket();
  };

  render() {
    const { connection, output } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {!connection ? (
          <Connect rooms={this.rooms} handlerConnect={this.handlerConnect} />
        ) : (
          <React.Fragment>
            <Settings handlerDisconnect={this.handlerDisconnect} />
            <Output contents={output} username={this.username} />
            <Inputs
              allrooms={this.rooms}
              handlerDisconnect={this.handlerDisconnect}
              handlerSend={this.handlerSend}
              usersInRoom={this.usersInRoom}
            />
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
