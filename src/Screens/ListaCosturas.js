import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import ItemCostura from '../components/ItemCostura'

export default function ListaCosturas({ navigation }) {

    return (
        <View style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Listas')}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>LISTA DE COSTURAS</Text>
                </View>
                <Lista />
            </View>
        </View>
    )
}

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

    DeletarCostura = (id) => {
        const banco = new Database()
        banco.DeletarCostura(id)
        this.ListarCosturas()
    }

    renderItem = ({item}) => {
        return (
            <ItemCostura key={item.id} item={item} id={item.id} Resumo={item.Resumo} NomeCliente={item.NomeCliente} 
            Telefone={item.Telefone} Descricao={item.Descricao} Valor={item.Valor} DataEntrega={item.DataEntrega} 
            Pago={item.Pago} Entregue={item.Entregue} deletar={this.DeletarCostura}/>
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10, marginBottom: 35 }}>
                <FlatList data={this.state.listaCosturas} renderItem={this.renderItem}/>
            </View>
        )
    }
}



