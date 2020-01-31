import React from 'react';
import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
}
             from 'react-native';

import Status           from "./components/Status";
import {messageFactory} from "./utils/MessageUtils";
import MessageList      from "./components/MessageList";

export default class App extends React.Component {
  state = {
    fullscreenImageId: null,
    messages         : [
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
              text : 'Cancel',
              style: 'cancel'
            },
            {
              text   : 'Delete',
              style  : 'destructive',
              onPress: () => {
                const {messages} = this.state;
                this.setState({
                  messages: messages.filter(message => message.id !== id)
                })
              }
            }
          ]
        );
        break;
      case 'image':
        this.setState({fullscreenImageId: id});
        break;

    }
  };

  dismissFullscreenImage = () => {
    this.setState({fullscreenImageId: null});
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if(!fullscreenImageId) return null;

    const image = messages.find( message => message.id === fullscreenImageId);

    if(!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{uri}} />
      </TouchableHighlight>
    )
  };

  componentWillMount(){
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;

      if(fullscreenImageId){
        this.dismissFullscreenImage();
        return true;
      }

      return false;
    });
  }

  componentWillUnmount(){
    if(this.subscription) this.subscription.remove();
  }

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
        {this.renderFullscreenImage()}
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
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex         : 2
  },
  fullscreenImage: {
    flex      : 1,
    resizeMode: 'contain'
  }
});
