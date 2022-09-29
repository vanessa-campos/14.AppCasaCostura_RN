import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { itemLista } from '../styles/index'
import { useNavigation } from '@react-navigation/native'

export default function ItemCostura({ item }) {
    return (
        <View style={itemLista.container}>
            <View style={style.container}>
                <View style={style.container1}>
                    <Text style={style.textTitle}>Id:</Text>
                    <Text style={style.textTitle}>Resumo:</Text>
                    <Text style={style.textTitle}>Nome do Cliente:</Text>
                    <Text style={style.textTitle}>Telefone:</Text>
                    <Text style={style.textTitle}>Descrição:</Text>
                    <Text style={style.textTitle}>Valor (R$):</Text>
                    <Text style={style.textTitle}>Data de Entrega:</Text>
                    <Text style={style.textTitle}>Pago:</Text>
                    <Text style={style.textTitle}>Entregue:</Text>
                </View>
                <View style={style.container2}>
                    <Text style={style.text}>{item.id}</Text>
                    <Text style={style.text}>{item.Resumo}</Text>
                    <Text style={style.text}>{item.NomeCliente}</Text>
                    <Text style={style.text}>{item.Telefone}</Text>
                    <Text style={style.text}>{item.Descricao}</Text>
                    <Text style={style.text}>{item.Valor}</Text>
                    <Text style={style.text}>{item.DataEntrega}</Text>
                    <Text style={style.text}>{item.Pago}</Text>
                    <Text style={style.text}>{item.Entregue}</Text>
                </View>
                <View style={style.container3}>
                <EditButton />
                <TouchableOpacity
                    onPress={() => { this.props.deletar(item.id) }}>
                    <Image source={require('../images/lixeira.png')} style={itemLista.icon} />
                </TouchableOpacity>
            </View>
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

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    container1: {
        flexDirection: 'column', 
    },
    container2: {
        flexDirection: 'column', width: '55%',
    },
    container3: {
        flexDirection: 'column', width: 30, justifyContent: 'space-evenly'
    },
    textTitle: {
        fontSize: 10, fontWeight: '400', color: '#999',
        marginEnd: 10, minWidth: 10,
    },
    text: {
        fontWeight: '400', fontSize: 10, marginEnd: 10,
        textTransform: 'uppercase',
    },
})