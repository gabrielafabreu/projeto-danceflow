import { Button, Image, View, Platform, Text, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import '@tensorflow-models/pose-detection';
import * as poseDetection from '@tensorflow-models/pose-detection';
import {imageToTensor} from './utils';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export class App extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };

    this.pickImage = this.pickImage.bind(this);
    this.detectPose = this.detectPose.bind(this);


    // const navigation = useNavigation();
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });
    const model = poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model, { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER });
    this.setState({...this.state, detector, model})

    console.log("teste um: ", this.state.image);
    let keys;
    keys = await AsyncStorage.getAllKeys();
    const valores = await AsyncStorage.multiGet(keys);
    console.log(valores);

    if(valores != null){
      this.setState({...this.state, image: valores[0][1]})
      console.log("teste ok");
      console.log(valores[0][1])
      console.log(this.state.image)
    }

    
  }
  

  pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    try{

    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({...this.state, image: result.uri})
    }

  }catch(e){
    console.error(e)
  }

    // if (!result.cancelled) {
    //   const manipResult = await ImageManipulator.manipulateAsync(
    //     result.localUri || result.uri,
    //     [{resize: {height:500,  width:500}}],
    //     { compress: 1, format: ImageManipulator.SaveFormat.PNG },
    //   );
    //   setImage(manipResult);
    // };
  }

  detectPose = async () => {
    console.log("teste: ", this.state.image)
    // const pose = null;

    

    // if(this.state.image != null){
    //   try{
    //     await this.state.detector.estimatePoses(
    //       await imageToTensor(this.state.image), {
    //         maxPoses: 1
    //       }
    //     )
    //   }
    //   catch(e){
    //     console.log(e)
    //   }
    // }
    console.log(tensorImage)
    const tensorImage = await imageToTensor(this.state.image)
    console.log(tensorImage)
    
    const pose = await this.state.detector.estimatePoses(tensorImage, {
      maxPoses: 1
    })
    console.log(JSON.stringify(pose))
    this.setState({...this.state, pose})
  }

  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100, }}>
        
        <Button title="Voltar" onPress={ () => this.props.navigation.goBack()} />
        <Text>         </Text>
        <Button title="Abrir camera" onPress={ () => this.props.navigation.navigate('AbrirCamera')} />
        <Text>         </Text>
        <Button title="Escolher imagem da galeria" onPress={this.pickImage} />
        {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
        <Text>{JSON.stringify(this.state.image)}</Text>
        {this.state.image && <Button title="Detect pose" onPress={this.detectPose} />}
        <ScrollView>
        <Text>{JSON.stringify(this.state.pose)}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default App;