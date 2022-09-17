import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { form, header, footer } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Database from '../database/Database'
import ItemVenda from '../components/ItemVenda';

export class Lista extends Component {

    constructor(props) {
        super(props)
        this.state = { listaVendas: [] }
        this.ListarVendas()
    }

    ListarVendas = () => {
        const banco = new Database()
        banco.ListarVendas().then(lista => { this.setState({ listaVendas: lista }) })
    }

    render() {
        return (
            <View style={form.container4}>
                <FlatList data={this.state.listaVendas} renderItem={(item) => ItemVenda(item)} />
            </View>
        )
    }
}

export default function ListaVendas({navigation}) {
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
                    <View style={form.containerTitle}><Text style={form.title}>LISTA DE VENDAS</Text></View>
                </View>
                <Lista />
            </View>
            <View style={footer.container}>
                <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
            </View>
        </View>
    )
}
