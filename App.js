import React                    from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Status                   from "./components/Status";

export default class App extends React.Component {
  renderMessageList() {
    return (
      <View style={styles.content}>
        <Text>Content</Text>
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
