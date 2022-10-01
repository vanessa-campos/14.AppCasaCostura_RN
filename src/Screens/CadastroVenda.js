import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import Venda from '../models/Venda'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-date-picker'


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
            Nome: "Nome do Produto", Quantidade: "", ValorTotal: "", Data: new Date(),
            listaVendas: [], listaNomeProdutos: [], open: false, textData2: "",
            textData: " Data - " + new Date().toDateString() + "  [Clique para alterar] "
        }
        this.ListarNomeProdutos()
    }

    CadastrarVenda = (Nome, Quantidade, ValorTotal, Data) => {
        const novaVenda = new Venda(Nome, Quantidade, ValorTotal, Data)
        const banco = new Database()
        banco.InserirVenda(novaVenda)
        banco.ListarVendas().then(lista => { this.setState({ listaVendas: lista }) })
    }

    ListarNomeProdutos = () => {
        const banco = new Database()
        banco.ListarNomeProdutos().then(lista => { this.setState({ listaNomeProdutos: lista }) })
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
                <View style={form.input}>
                    <Picker
                        selectedValue={this.state.Nome}
                        style={form.picker}
                        onValueChange={(itemValue, itemIndex) => { this.setState({ Nome: itemValue }) }}>
                        <Picker.Item label="Nome do Produto" value="" />
                        {this.state.listaNomeProdutos.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>
                </View>
                <TextInput style={form.input} placeholder=" Quantidade"
                    onChangeText={(valor) => { this.setState({ Quantidade: valor }) }} />
                <TextInput style={form.input} placeholder=" Valor Total (R$)"
                    onChangeText={(valor) => { this.setState({ ValorTotal: valor }) }} />
                <TouchableOpacity style={form.input} onPress={() => { this.setState({ open: true }) }}>
                    <Text style={form.text1}>{this.state.textData}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal open={this.state.open}
                    mode="date" locale='pt-BR'
                    date={this.state.Data}
                    onConfirm={(valor) => {
                        this.setState({
                            open: false, Data: valor,
                            textData: this.state.Data.toDateString()
                        })
                    }}
                    onCancel={() => { this.setState({ open: false }) }}
                />
                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarVenda(this.state.Nome, this.state.Quantidade,
                            this.state.ValorTotal, this.state.Data.toDateString()),
                            this.props.navigation.navigate('ListaVendas')
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

