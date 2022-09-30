import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import Venda from '../models/Venda'

export default function CadastroVenda({ navigation }) {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>VENDA</Text>
                </View>
                <Cadastro navigation={navigation} />
            </View>
        </ScrollView>
    )
}

export class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {           
            Nome: "", Quantidade: "", ValorTotal: "", Data: "",    
            // Data: new Date().toDateString,
            listaVendas: [], listaProdutos: [],
        }
    }

    CadastrarVenda = (Nome, Quantidade, ValorTotal, Data) => {
        const novaVenda = new Venda(Nome, Quantidade, ValorTotal, Data)
        const banco = new Database()
        banco.InserirVenda(novaVenda)
        banco.ListarVendas().then(lista => { this.setState({ listaVendas: lista }) })
    }

    // Conta = () => {
    //     this.setState({ ValorTotal: this.state.Valor * this.state.Quantidade })
    // }

    // Filtrar = (texto) => {
    //     this.setState({ selecao: texto })
    //     let filtro = this.state.listaProdutos.filter(
    //         (item) => {
    //             return item.Nome.toLowerCase().includes(texto.toLowerCase())
    //         }
    //     )
    //     this.setState({ dadosFiltrados: filtro })
    // }

    render() {
        return (
            <View style={form.container1}>

                <TextInput style={form.input} placeholder=" Nome do Produto"
                    onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                <TextInput style={form.input} placeholder=" Quantidade"
                    onChangeText={(valor) => { this.setState({ Quantidade: valor }) }} />
                <TextInput style={form.input} placeholder=" Valor Total (R$)"
                    onChangeText={(valor) => { this.setState({ ValorTotal: valor }) }} />  
                <TextInput style={form.input} placeholder=" Data (XX/XX/XXXX)"
                    onChangeText={(valor) => { this.setState({ Data: valor }) }} />

                {/* <TextInput style={form.input} placeholder={this.state.Data}
                    onChangeText={(valor) => { this.setState({ Data: valor }) }} /> */}

                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarVenda(this.state.Nome, this.state.Quantidade, 
                        this.state.ValorTotal, this.state.Data ),
                        this.props.navigation.navigate('ListaVendas')
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

