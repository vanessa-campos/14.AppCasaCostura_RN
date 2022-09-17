import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native';
import { form, header, footer } from '../styles';
import Database from '../database/Database'
import ItemProduto from '../components/ItemProduto';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export class Lista extends Component {

    constructor(props) {
        super(props)
        this.state = { listaProdutos: [] }
        this.ListarProdutos()
    }

    ListarProdutos = () => {
        const banco = new Database()
        banco.ListarProdutos().then(lista => { this.setState({ listaProdutos: lista }) })
    }

    render() {
        return (
            <View style={form.container4}>
                <FlatList data={this.state.listaProdutos} renderItem={(item) => ItemProduto(item)} />
            </View>
        )
    }
}

export default function ListaProdutos({ navigation }) {
    return (
        <View style={form.background}>
            <View style={header.container}>
                <Image source={require('../images/logo.png')} style={header.image} />
            </View>
            <View style={{ flex: 1, margin: 20 }}>
                <View style={form.container2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={form.icon}>
                        <FontAwesomeIcon icon={faArrowLeftLong} color={'#999'} size={15} />
                    </TouchableOpacity>
                    <View style={form.containerTitle}><Text style={form.title}>LISTA DE PRODUTOS</Text></View>
                </View>
                <Lista />
            </View>
            <View style={footer.container}>
                <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
            </View>
        </View>
    )
}