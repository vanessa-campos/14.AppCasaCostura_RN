import React from 'react';
import { View, Text } from 'react-native'
import { itemLista } from '../styles/index'

export default function ItemVenda({ item }) {
    return (
        <View style={itemLista.container1}>
            <View style={itemLista.container2}>
                <Text style={itemLista.text1}>{item.id}</Text>
                <Text style={itemLista.text1}>{item.Categoria}</Text>
                <Text style={itemLista.text1}>{item.Nome}</Text>
            </View>
            <View style={itemLista.container3}>
                <Text style={itemLista.text1}>{item.Descricao}</Text>
                <Text style={itemLista.text1}>{item.Tamanho}</Text>
                <Text style={itemLista.text1}>{item.Valor}</Text>
                <Text style={itemLista.text1}>{item.Unidade}</Text>
                <Text style={itemLista.text1}>{item.Quantidade}</Text>
            </View>
        </View>
    )
}
