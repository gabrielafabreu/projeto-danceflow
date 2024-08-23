import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

        <Text>Page: InserirImagem</Text>
        <StatusBar style="auto" />

        <TouchableOpacity 
            // style = {styles.seta}
            onPress = {() => navigation.navigate("AbrirCamera")}>
            <Text>Tela - Detectar pose</Text>
        </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});