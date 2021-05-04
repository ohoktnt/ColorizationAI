import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Image Colorization AI</Text>
          <Text style={styles.subtitle}>Color black and white images!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/old-video-camera.png')} style={styles.cameraImage}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Select Image"
            titleStyle={{fontSize: 20}}
            buttonStyle={styles.button}></Button>
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
  }
});
