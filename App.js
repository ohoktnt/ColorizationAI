import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import {launchImageLibrary} from 'react-native-image-picker';
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

  goBackFunction() {
    this.setState({
      menu: true,
      dataSource: null,
      loading: true,
      base64: null,
    });
  }

  goForAxios() {
    console.log('Starting Request');
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
          imageBase64: base64,
          render_factor: '20',
        },
      })
      .then(response => {
        this.setState({
          loading: false,
          dataSource: response.data.imageBase64,
        });
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectGalleryImage() {
    const options = {
      includeBase64: true, //encoded version of image in terms of numbers
    };
    launchImageLibrary(options, response => {
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
    const {loading, dataSource, base64, menu} = this.state;

    return menu ? (
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
    ) : (
      <View style={styles.outputContainer}>
        <Button
          title="Go to Menu"
          buttonStyle={styles.button}
          onPress={this.goBackFunction.bind(this)}></Button>
        {base64 ? (
          <Image
            style={styles.images}
            source={{uri: `data:image/png;base64,${base64}`}}></Image>
        ) : (
          <ProgressBar indeterminate={true}></ProgressBar>
        )}
        {loading ? (
          <ProgressBar indeterminate={true}></ProgressBar>
        ) : (
          <Image
            style={styles.images}
            source={{uri: `data:image/png;base64,${dataSource}`}}></Image>
        )}
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
  outputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff70b8',
  },
  images: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    margin: 10,
  },
});
