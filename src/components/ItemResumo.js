import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { itemLista } from '../styles/index'

export default function ItemResumo({ item }) {

    return (
        <View style={itemLista.container}>
            <View style={style.container}>
                <View style={style.container1}>
                    <Text style={style.textTitle}>Descrição:</Text>
                    <Text style={style.textTitle}>Tamanho:</Text>
                    <Text style={style.textTitle}>Quantidade:</Text>
                    <Text style={style.textTitle}>Valor (R$):</Text>
                    <Text style={style.textTitle}>Data:</Text>
                    <Text style={itemLista.text1}>{item.Categoria}</Text>
                    <Text style={itemLista.text1}>{item.Nome}</Text>
                </View>
            </View>
            <View style={style.container1}>
                <Text style={style.text}>{item.Descricao}</Text>
                <Text style={style.text}>{item.Tamanho}</Text>
                <Text style={style.text}>{item.Valor}</Text>
                <Text style={style.text}>{item.Unidade}</Text>
                <Text style={style.text}>{item.Quantidade}</Text>
            </View>
        </View>
    )
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
