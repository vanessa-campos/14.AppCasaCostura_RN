import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import ItemProduto from '../components/ItemProduto'

export default function ListaProdutos({ navigation }) {
    
    return (
        <View style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Listas')}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>LISTA DE PRODUTOS</Text>
                </View>
                <Lista />
            </View>
        </View>
    )
}

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

    DeletarProduto = (id) => {
        const banco = new Database()
        banco.DeletarProduto(id)
        banco.ListarProdutos().then(lista => { this.setState({ listaProdutos: lista }) })
    }

    renderItem = ({item}) => {
        return (
            <ItemProduto key={item.id} item={item} id={item.id} Categoria={item.Categoria} Nome={item.Nome} 
            Descricao={item.Descricao} Tamanho={item.Tamanho} Valor={item.Valor} Unidade={item.Unidade} 
            Quantidade={item.Quantidade} Imagem={item.Imagem} deletar={this.DeletarProduto}/>
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10, marginBottom: 35 }}>
                <FlatList data={this.state.listaProdutos} renderItem={this.renderItem} />
            </View>
        )
    }
}
