import React from 'react';
import {
  CameraRoll,
  Image,
  StyleSheet,
  TouchableOpacity
}            from 'react-native';

import * as Permissions from 'expo-permissions';
import PropTypes        from 'prop-types';

import Grid from './Grid';

const keyExtractor = ({uri}) => uri;

export default class ImageGrid extends React.Component {
  loading = false;
  cursor  = null;

  static propTypes = {
    onPressImage: PropTypes.func
  };

  static defaultProps = {
    onPressImage: () => {
    }
  };

  state = {
    images: [
      /*
      createTempImage(10),
      createTempImage(20),
      createTempImage(30),
      createTempImage(40),
      */
    ]
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async (after) => {
    if(this.loading) return;


    const {status} = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (status !== 'granted') {
      console.log('Camera roll permission denied.');
      return;
    }

    this.loading = true;

    const results = await CameraRoll.getPhotos({
      first    : 20,
      after,
      assetType: 'Photos'
    });

    const {
      edges,
      page_info: { has_next_page, end_cursor}
    } = results;

    const images = edges.map(item => item.node.image);

    this.setState({
      images: this.state.images.concat(images)
    }, () => {
      this.loading = false;
      this.cursor = has_next_page ? end_cursor : null
    });
  };

  getNextImages = () => {
    if(!this.cursor) return;

    this.getImages(this.cursor);
  }

  renderItem = ({item: {uri}, size, marginTop, marginLeft}) => {
    const { onPressImage } = this.props;

    const style = {
      width : size,
      height: size,
      marginLeft,
      marginTop
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.50}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{uri}} style={styles.image}/>
      </TouchableOpacity>
    );
  };

  render() {
    const {images} = this.state;

    return (
      <Grid data={images}
            renderItem={this.renderItem}
            keyExtractor={keyExtractor}
            onEndReached={this.getNextImages}
      />
    )
  }
}

const createTempImage = (num) => {
  return {uri: `https://picsum.photos/600/600?image=${num}`};
};

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});