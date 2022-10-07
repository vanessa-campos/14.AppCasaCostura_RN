import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import ItemVenda from '../components/ItemVenda'

export default function ListaVendas({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Listas')}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>LISTA DE VENDAS</Text>                    
                </View>
                <Text style={{fontSize: 10, color: '#999', marginTop: 10, textAlign: 'justify'}}>
                    * Para editar um valor clique sobre o texto, altere e salve clicando no botão ao lado</Text>
                <Lista />
            </View>
        </View>
    )
}

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

    DeletarVenda = (id) => {
        const banco = new Database()
        banco.DeletarVenda(id)
        banco.ListarVendas()
    }

    renderItem = ({item}) => {
        return (
            <ItemVenda key={item.id} item={item} id={item.id} Nome={item.Nome} Valor={item.Valor}
            ValorTotal={item.ValorTotal} Quantidade={item.Quantidade} Data={item.Data} 
            deletar={this.DeletarVenda}/>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList data={this.state.listaVendas} renderItem={this.renderItem}/>
            </View>
        )
    }
}