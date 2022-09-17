import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Home from './Screens/Home'
import CadastroVenda from './Screens/CadastroVenda'
import CadastroCostura from './Screens/CadastroCostura'
import CadastroProduto from './Screens/CadastroProduto'
import ListaVendas from './Screens/ListaVendas'
import ListaCosturas from './Screens/ListaCosturas'
import ListaProdutos from './Screens/ListaProdutos'
import ListaResumo from './Screens/ListaResumo'
import EditarProduto from './Screens/EditarProduto'

const Stack = createStackNavigator();

export default function StackNavigator(){

    return(
        <Stack.Navigator>     
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} /> 
            <Stack.Screen name="CadastroVenda" component={CadastroVenda} options={{headerShown: false}} /> 
            <Stack.Screen name="CadastroCostura" component={CadastroCostura} options={{headerShown: false}}/>           
            <Stack.Screen name="CadastroProduto" component={CadastroProduto} options={{headerShown: false}}/>   
            <Stack.Screen name="ListaVendas" component={ListaVendas} options={{headerShown: false}}/>   
            <Stack.Screen name="ListaCosturas" component={ListaCosturas} options={{headerShown: false}}/>   
            <Stack.Screen name="ListaProdutos" component={ListaProdutos} options={{headerShown: false}}/>   
            <Stack.Screen name="ListaResumo" component={ListaResumo} options={{headerShown: false}}/>   
            <Stack.Screen name="EditarProduto" component={EditarProduto} options={{headerShown: false}}/>   
        </Stack.Navigator>
    )
}