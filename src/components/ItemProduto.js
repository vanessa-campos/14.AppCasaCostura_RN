import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { itemLista } from '../styles/index'
import { useNavigation } from '@react-navigation/native'

export default class ItemProduto extends Component {

    render() {
        return (
            <View style={itemLista.container}>
                <View style={style.container}>
                    <View style={style.container}>
                        <View style={style.container1}>
                            {this.props.Imagem == "" ? 
                            <Text style={style.textImage}>Nenhuma imagem encontrada</Text> : 
                            <Image style={style.image} source={{ uri: this.props.Imagem }}></Image> }
                        </View>
                        <View style={style.container}>
                            <View style={style.container1}>
                                <Text style={style.textTitle}>Id:</Text>
                                <Text style={style.textTitle}>Categoria:</Text>
                                <Text style={style.textTitle}>Nome:</Text>
                                <Text style={style.textTitle}>Descrição:</Text>
                                <Text style={style.textTitle}>Tamanho:</Text>
                                <Text style={style.textTitle}>Valor:</Text>
                                <Text style={style.textTitle}>Quantidade:</Text>
                                <Text style={style.textTitle}>Unidade:</Text>
                            </View>
                            <View style={style.container1}>
                                <Text style={style.text}>{this.props.id}</Text>
                                <Text style={style.text}>{this.props.Categoria}</Text>
                                <Text style={style.text}>{this.props.Nome}</Text>
                                <Text style={style.text}>{this.props.Descricao}</Text>
                                <Text style={style.text}>{this.props.Tamanho}</Text>
                                <Text style={style.text}>R$ {this.props.Valor}</Text>
                                <Text style={style.text}>{this.props.Quantidade}</Text>
                                <Text style={style.text}>{this.props.Unidade}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={style.container1}>
                        <EditButton />
                        <TouchableOpacity
                            onPress={() => { this.props.deletar(this.props.id) }}>
                            <Image source={require('../images/lixeira.png')} style={itemLista.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
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
        flexDirection: 'row', justifyContent: 'space-between'
    },
    container1: {
        flexDirection: 'column', justifyContent: 'space-evenly',
    },
    textTitle: {
        fontSize: 10, fontWeight: '400', color: '#999',
        marginHorizontal: 10,
    },
    text: {
        fontWeight: '400', fontSize: 10, marginEnd: 10,
        textTransform: 'uppercase',
    },
    image: {
        height: 100, width: 70, borderColor: '#B3ADAD', borderWidth: 1,
    },
    textImage: {
        fontSize: 10, fontWeight: '400', color: '#999',
        marginHorizontal: 10, maxWidth: 70, textAlign: 'center',
    }
})