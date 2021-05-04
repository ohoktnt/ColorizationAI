import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

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

  goForAxios() {
    console.log('Starting Request')
    const {base64} = this.state;
    this.setState({menu: false});

    axios
      .request({
        method: 'POST',
        url: 'https://ai-picture-colorizer.p.rapidapi.com/colorize-picture',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key':
            '34986c28e0mshc68992223a227ffp13653ejsna014a46c3df3',
          'x-rapidapi-host': 'ai-picture-colorizer.p.rapidapi.com',
        },
        data: {
          imageBase64:
            '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',
          render_factor: '20',
        },
      })
      .then(response => {
        this.setState({
          loading: false,
          dataSource: response.data.imageBase64,
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
        this.goForAxios();
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
