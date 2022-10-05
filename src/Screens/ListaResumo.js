import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import ItemResumo from '../components/ItemResumo'

export default function ListaResumo({ navigation }) {
    
    return (
        <View style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Listas')}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>RESUMO DO MÊS</Text>
                </View>
                <Lista />
            </View>
        </View>
    )
}

export class Lista extends Component {

    constructor(props) {
        super(props)
        this.state = { listaResumo: [] }
        this.ListarResumo()
    }

    ListarResumo = () => {
        const banco = new Database()
        banco.ListarResumo().then(lista => { this.setState({ listaResumo: lista }) })
    }

    renderItem = ({item}) => {
        return (
            <ItemResumo key={item.id} item={item} id={item.id} Mes={item.Mes}  
            Quantidade={item.Quantidade} Valor={item.Valor} />
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10, marginBottom: 35 }}>
                <FlatList data={this.state.listaResumo} renderItem={this.renderItem} />
            </View>
        )
    }
}


