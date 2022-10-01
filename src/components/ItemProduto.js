import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { itemLista } from '../styles/index'
import { useNavigation } from '@react-navigation/native'

export default function ItemProduto({ item }) {
    return (
        <View style={itemLista.container}>
            <View style={style.container}>
                <Image style={style.image} source={{ uri: item.Imagem }} />
                <View style={style.container1}>
                    <View style={style.container2}>
                        <Text style={style.textTitle}>Id:</Text>
                        <Text style={style.textTitle}>Categoria:</Text>
                        <Text style={style.textTitle}>Nome:</Text>
                        <Text style={style.textTitle}>Descrição:</Text>
                        <Text style={style.textTitle}>Tamanho:</Text>
                        <Text style={style.textTitle}>Valor (R$):</Text>
                        <Text style={style.textTitle}>Quantidade:</Text>
                        <Text style={style.textTitle}>Unidade:</Text>
                    </View>
                    <View style={style.container2}>
                        <Text style={style.text}>{item.id}</Text>
                        <Text style={style.text}>{item.Categoria}</Text>
                        <Text style={style.text}>{item.Nome}</Text>
                        <Text style={style.text}>{item.Descricao}</Text>
                        <Text style={style.text}>{item.Tamanho}</Text>
                        <Text style={style.text}>{item.Valor}</Text>
                        <Text style={style.text}>{item.Quantidade}</Text>
                        <Text style={style.text}>{item.Unidade}</Text>
                    </View>
                </View>
                <View style={style.container3}>
                    <EditButton />
                    <TouchableOpacity
                        onPress={() => {item.deletar(item.id) }}>
                        <Image source={require('../images/lixeira.png')} style={itemLista.icon} />
                    </TouchableOpacity>
                </View>
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

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    container1: {
        flexDirection: 'row', width: '60%',
    },
    container2: {
        flexDirection: 'column', 
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
    image: {
        height: 100, width: 70, borderColor: '#B3ADAD', borderWidth: 1,
    },
})