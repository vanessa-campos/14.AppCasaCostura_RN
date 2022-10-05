import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { itemLista } from '../styles/index'
import { useNavigation } from '@react-navigation/native'
import Database from '../database/Database'

export default class ItemVenda extends Component {

    render() {
        return (
            <View style={itemLista.container}>
                <View style={style.container}>
                    <View style={style.container}>
                        <View style={style.container1}>
                            <Text style={style.textTitle}>Id:</Text>
                            <Text style={style.textTitle}>Nome:</Text>
                            <Text style={style.textTitle}>Quantidade:</Text>
                            <Text style={style.textTitle}>Valor Total:</Text>
                            <Text style={style.textTitle}>Data:</Text>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text}>{this.props.id}</Text>
                            <Text style={style.text}>{this.props.Nome}</Text>
                            <Text style={style.text}>{this.props.Quantidade}</Text>
                            <Text style={style.text}>R$ {this.props.ValorTotal}</Text>
                            <Text style={style.text}>{this.props.Data}</Text>
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
        flexDirection: 'column', justifyContent: 'space-evenly'
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