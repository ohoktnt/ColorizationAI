import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: true,
      dataSource: null,
      loading: true,
      base64: null,
    };
  }

  selectGalleryImage() {
    const options = {
      includeBase64: true, //encoded version of image in terms of numbers
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User Cancelled Image');
      } else if (response.error) {
        console.log('ImagePicker Error');
      } else if (response.customButton) {
        console.log('User pressed custom buttom');
      } else {
        // console.log('Image Picker Successful');
        this.setState({base64: response.base64});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Image Colorization AI</Text>
          <Text style={styles.subtitle}>Color black and white images!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/old-video-camera.png')}
            style={styles.cameraImage}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Select Image"
            titleStyle={{fontSize: 20}}
            buttonStyle={styles.button}
            onPress={this.selectGalleryImage.bind(this)}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff70b8',
  },
  titleContainer: {
    marginTop: 80,
    marginLeft: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 17,
  },
  buttonContainer: {
    paddingBottom: 70,
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 57,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraImage: {
    width: 270,
    height: 270,
  },
});
