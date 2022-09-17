import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { form, header, footer } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Database from '../database/Database'
import ItemCostura from '../components/ItemCostura';

export class Lista extends Component {

    constructor(props) {
        super(props)
        this.state = { listaCosturas: [] }
        this.ListarCosturas()
    }

    ListarCosturas = () => {
        const banco = new Database()
        banco.ListarCosturas().then(lista => { this.setState({ listaCosturas: lista }) })
    }

    render(){
        return (
            <View style={form.container4}>
                <FlatList data={this.state.listaCosturas} renderItem={(item) => ItemCostura(item)} />
            </View>
        )
    }
}

export default function ListaCosturas({ navigation }) {
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
                    <View style={form.containerTitle}><Text style={form.title}>LISTA DE COSTURAS</Text></View>
                </View>
                <Lista />
            </View>
            <View style={footer.container}>
                <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
            </View>
        </View>
    )
}

