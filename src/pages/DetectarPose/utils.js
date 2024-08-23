import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from 'expo-file-system'
import * as tf from '@tensorflow/tfjs';
import * as ImageManipulator from 'expo-image-manipulator';

export const imageToTensor = async (imageUri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{resize: {height: 225,  width:400}}],
        { compress: 1, base64: true,  },
    );
    const imgBuffer = tf.util.encodeString(manipResult.base64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer)
    return decodeJpeg(raw)
}

const prepareUri = (uri) => {
    if (Platform.OS === 'android') return encodeURI(uri)
    else return uri
}