import React from 'react';
import {
  Alert,
  StyleSheet,
  Text, View
}
             from 'react-native';

import Status           from "./components/Status";
import {messageFactory} from "./utils/MessageUtils";
import MessageList      from "./components/MessageList";

export default class App extends React.Component {
  state = {
    messages: [
      messageFactory('text', 'Hello world!'),
      messageFactory('image', 'https://unsplash.it/300/300'),
      messageFactory('text', 'SOme random image there bruh!'),
      messageFactory('location', {
        latitude : 37.78825,
        longitude: -122.4324
      })
    ]
  };

  handlePressMessage = ({id, type}) => {
    switch (type) {
      case 'text':
        Alert.alert('Delete message?', 'Are you sure you want to permanently delete this message',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter( message => message.id !== id)
                })
              }
            }
          ]
          )
    }
  };

  renderMessageList() {
    const {messages} = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  renderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}>
        <Text>Method Editor</Text>
      </View>
    );
  }

  renderToolbar() {
    return (
      <View style={styles.toolbar}>
        <Text>Toolbar</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Status/>
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container        : {
    flex           : 1,
    backgroundColor: '#fff',
  },
  content          : {
    flex           : 1,
    backgroundColor: '#fff',
  },
  inputMethodEditor: {
    flex           : 1,
    backgroundColor: '#fff',
  },
  toolbar          : {
    borderTopWidth : 1,
    borderTopColor : 'rgba(0,0,0,.04)',
    backgroundColor: '#fff',
  }
});
