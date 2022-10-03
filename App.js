import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Home from './src/Screens/Home'
import Listas from './src/Screens/Listas'
import CadastroVenda from './src/Screens/CadastroVenda'
import CadastroCostura from './src/Screens/CadastroCostura'
import CadastroProduto from './src/Screens/CadastroProduto'
import ListaVendas from './src/Screens/ListaVendas'
import ListaCosturas from './src/Screens/ListaCosturas'
import ListaProdutos from './src/Screens/ListaProdutos'
import ListaResumo from './src/Screens/ListaResumo'
import EditarProduto from './src/Screens/EditarProduto'
import { header, footer } from './src/styles'
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator()

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Listas" component={Listas} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroVenda" component={CadastroVenda} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroCostura" component={CadastroCostura} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroProduto" component={CadastroProduto} options={{ headerShown: false }} />
      <Stack.Screen name="ListaVendas" component={ListaVendas} options={{ headerShown: false }} />
      <Stack.Screen name="ListaCosturas" component={ListaCosturas} options={{ headerShown: false }} />
      <Stack.Screen name="ListaProdutos" component={ListaProdutos} options={{ headerShown: false }} />
      <Stack.Screen name="ListaResumo" component={ListaResumo} options={{ headerShown: false }} />
      <Stack.Screen name="EditarProduto" component={EditarProduto} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function Header() {

  const navigation = useNavigation()

  return (
    <View>
      <View style={header.container1}>
        <Image source={require('./src/images/logo.png')} style={header.image} />
        <Text style={header.textLogo}>~ Gerenciamento de produtos, vendas e serviços ~</Text>

      </View>

      <View style={header.container2}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={header.button}>
          <Image source={require('./src/images/cadastrar.png')} style={header.icon} />
          <Text style={header.text}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Listas')} style={header.button}>
          <Image source={require('./src/images/lista.png')} style={header.icon} />
          <Text style={header.text}>Listas</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Footer() {
  return (
    <View style={footer.container}>
      <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
    </View>
  )
}

export default function App() {

  useEffect(() => { SplashScreen.hide() }, [])

  return (
    <NavigationContainer style={style}>
      <Header />
      <StackNavigator />
      <Footer />
    </NavigationContainer>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 250, alignItems: "center"
  }
})