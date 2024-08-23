import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const AppStack = createStackNavigator(); //Cria um StackNavigator
import DetectarPose from './pages/DetectarPose';
import Home from './pages/Home';
import AbrirCamera from './pages/AbrirCamera';

export default function Rotas() { //Exporta para que possa ser "visto" no resto do aplicativo
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="DetectarPose" component={DetectarPose} />
                <AppStack.Screen name="AbrirCamera" component={AbrirCamera} />
                
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

