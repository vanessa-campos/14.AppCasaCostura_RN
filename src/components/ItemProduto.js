import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { itemLista } from '../styles/index'
import { useNavigation } from '@react-navigation/native'

export default function ItemProduto({ item }) {
    return (
        <View style={itemLista.container}>
            <View style={itemLista.container1}>
                <Image style={itemLista.image} source={{ uri: item.Imagem }} />
            </View>
            <View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.id}</Text>
                    <Text style={itemLista.text1}>{item.Categoria}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Nome}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Descricao}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Tamanho}</Text>
                    <Text style={itemLista.text1}>{item.Valor}</Text>
                </View>
                <View style={itemLista.container2}>
                    <Text style={itemLista.text1}>{item.Quantidade}</Text>
                    <Text style={itemLista.text1}>{item.Unidade}</Text>
                </View>
            </View>
            <View style={itemLista.container3}>
                <EditButton />
                <TouchableOpacity
                    onPress={() => { this.props.deletar(item.id) }}>
                    <Image source={require('../images/lixeira.png')} style={itemLista.icon} />
                </TouchableOpacity>
            </View>
        </View>
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