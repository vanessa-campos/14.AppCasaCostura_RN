import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import Costura from '../models/Costura'

export default function CadastroCostura({ navigation }) {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>COSTURA</Text>
                </View>
                <Cadastro navigation={navigation}/>
            </View>
        </ScrollView>
    )
}

class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Resumo: "", NomeCliente: "", Telefone: "", Descricao: "", 
            Valor: "", DataEntrega: "", Pago: "", Entregue: "", listaCosturas: []
        }
    }

    CadastrarCostura = (Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue) => {
        const novaCostura = new Costura(
            Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue)
        const banco = new Database()
        banco.InserirCostura(novaCostura)
    }

    render() {
        return (
            <View style={form.container1}>
                <TextInput style={form.input} placeholder=" Resumo"
                    onChangeText={(valor) => { this.setState({ Resumo: valor }) }} />
                <TextInput style={form.input} placeholder=" Nome do Cliente"
                    onChangeText={(valor) => { this.setState({ NomeCliente: valor }) }} />
                <TextInput style={form.input} placeholder=" Telefone (XX XXXXX-XXXX)"
                    onChangeText={(valor) => { this.setState({ Telefone: valor }) }} />
                <TextInput style={form.input} placeholder=" Descrição"
                    onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
                <TextInput style={form.input} placeholder=" Valor (R$)"
                    onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                <TextInput style={form.input} placeholder=" Data de Entrega (XX/XX/XXXX)"
                    onChangeText={(valor) => { this.setState({ DataEntrega: valor }) }} />
                <TextInput style={form.input} placeholder=" Pago na hora (Sim/Não)"
                    onChangeText={(valor) => { this.setState({ Pago: valor }) }} />
                <TextInput style={form.input} placeholder=" Entregue (Sim/Não)"
                    onChangeText={(valor) => { this.setState({ Entregue: valor }) }} />
                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarCostura(this.state.Resumo, this.state.NomeCliente, 
                        this.state.Telefone, this.state.Descricao, this.state.Valor,
                        this.state.DataEntrega, this.state.Pago, this.state.Entregue),
                        this.props.navigation.navigate('ListaCosturas')
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

