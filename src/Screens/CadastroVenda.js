import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import Venda from '../models/Venda'
import Resumo from '../models/Resumo'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-date-picker'
import ItemProduto from '../components/ItemProduto';


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
            Nome: "Nome do Produto", Valor: "0", Quantidade: "0", ValorTotal: "0", Data: new Date(),
            listaProdutos: [], open: false,
        }
        this.ListarProdutos()
    }

    CadastrarVenda = (Nome, Valor, Quantidade, ValorTotal, Data) => {
        const novaVenda = new Venda(Nome, Valor, Quantidade, ValorTotal, Data)
        const banco = new Database()
        banco.InserirVenda(novaVenda)
    }

    ResumoMes = () => {

        const novoResumo = new Resumo(Mes, Quantidade, Valor)
        const banco = new Database()
        banco.InserirResumo(novoResumo)
    }

    ListarProdutos = () => {
        const banco = new Database()
        banco.ListarProdutos().then(lista => { this.setState({ listaProdutos: lista }) })
        this.state.listaProdutos.map(produto => (<ItemProduto id={produto.id} Nome={produto.Nome} />))
        console.log('Lista: ' + this.state.listaProdutos)
    }

    render() {
        return (
            <View style={form.container1}>
                {/* <View style={form.input}> 
                     <Picker
                        selectedValue={this.state.Nome}
                        style={form.picker}
                        onValueChange={(itemValue, itemIndex) => { this.setState({ Nome: itemValue }) }}>
                        <Picker.Item label="Nome do Produto" value="" />
                        {this.state.listaProdutos.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })} 
                    </Picker> 
                 </View> */}
                <TextInput style={form.input} placeholder=" Nome do Produto"
                    onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                <TextInput style={form.input} placeholder=" Valor do produto: R$ 0"
                    onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                <TextInput style={form.input} placeholder=" Quantidade"
                    onChangeText={(valor) => { this.setState({ Quantidade: valor, ValorTotal: this.state.Valor * valor }) }} />
                <View style={form.input}>
                    <Text style={form.text1}> Valor Total: R$ {this.state.Valor * this.state.Quantidade}</Text>
                </View>
                <TouchableOpacity style={form.input} onPress={() => { this.setState({ open: true }) }}>
                    <Text style={form.text1}> Data: {this.state.Data.toDateString()}          [Alterar data]</Text>
                </TouchableOpacity>
                <DatePicker
                    modal open={this.state.open}
                    mode="date" locale='pt-BR'
                    date={this.state.Data}
                    onConfirm={(valor) => { this.setState({ open: false, Data: valor }) }}
                    onCancel={() => { this.setState({ open: false }) }}
                />
                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarVenda(this.state.Nome, this.state.Valor, this.state.Quantidade,
                            this.state.ValorTotal, this.state.Data.toDateString()),
                            this.props.navigation.navigate('ListaVendas')
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

