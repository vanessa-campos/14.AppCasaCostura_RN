import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { itemLista } from '../styles/index'
import { useNavigation } from '@react-navigation/native'

export default function ItemCostura({ item }) {
    return (
        <View style={itemLista.container}>
            <View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.id}</Text>
                    <Text style={itemLista.text1}>{item.Resumo}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.NomeCliente}</Text>
                    <Text style={itemLista.text1}>{item.Telefone}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Descricao}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Valor}</Text>
                    <Text style={itemLista.text1}>{item.DataEntrega}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Pago}</Text>
                    <Text style={itemLista.text1}>{item.Entregue}</Text>
                </View>
            </View>
            <View style={itemLista.container3}>
                <EditButton />
                <TouchableOpacity
                    onPress={() => { this.props.deletar(item.id) }}>
                    <Image source={require('../images/lixeira.png')} style={itemLista.icon} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

function EditButton() {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('EditarProduto') }}>
            <Image source={require('../images/editar.png')} style={itemLista.icon} />
        </TouchableOpacity>
    )
}