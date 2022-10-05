import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { itemLista } from '../styles/index'

export default class ItemResumo extends Component {

    render() {
        return (
            <View style={itemLista.container}>
                <View style={style.container}>
                    <View style={style.container1}>
                        <Text style={style.textTitle}>Id:</Text>
                        <Text style={style.textTitle}>Mês:</Text>
                        <Text style={style.textTitle}>Quantidade:</Text>
                        <Text style={style.textTitle}>Valor Total:</Text>
                    </View>
                </View>
                <View style={style.container1}>
                    <Text style={style.text}>{item.id}</Text>
                    <Text style={style.text}>{item.Mes}</Text>
                    <Text style={style.text}>{item.Quantidade}</Text>
                    <Text style={style.text}>{item.Valor}</Text>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'flex-start'
    },
    container1: {
        flexDirection: 'column'
    },
    textTitle: {
        fontSize: 10, fontWeight: '400', color: '#999',
        marginEnd: 10, minWidth: 10,
    },
    text: {
        fontWeight: '400', fontSize: 10, marginEnd: 10, textTransform: 'uppercase',
        minWidth: 10
    },
})
