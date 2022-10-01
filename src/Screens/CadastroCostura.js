import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image, Switch } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import Costura from '../models/Costura'
import DatePicker from 'react-native-date-picker'

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
                <Cadastro navigation={navigation} />
            </View>
        </ScrollView>
    )
}

class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Resumo: "", NomeCliente: "", Telefone: "", Descricao: "", open: false, listaCosturas: [],
            Valor: "", DataEntrega: new Date(), Pago: false, Entregue: false, PagoText: "não", EntregueText: "não",
            textData: " Data - " + new Date().toDateString() + "  [Clique para alterar] "
        }
    }

    CadastrarCostura = (Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue) => {
        const novaCostura = new Costura(
            Resumo, NomeCliente, Telefone, Descricao, Valor, DataEntrega, Pago, Entregue)
        const banco = new Database()
        banco.InserirCostura(novaCostura)
    }

    verificarBoolPago = () => {
        this.state.Pago ? this.state.PagoText = "não" : this.state.PagoText = "sim"
    }
    verificarBoolEntregue = () => {
        this.state.Entregue ? this.state.EntregueText = "não" : this.state.EntregueText = "sim"
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
                <TouchableOpacity style={form.input} onPress={() => { this.setState({ open: true }) }}>
                    <Text style={form.text1}>{this.state.textData}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal open={this.state.open}
                    mode="date" locale='pt-BR'
                    date={this.state.DataEntrega}
                    onConfirm={(valor) => {
                        this.setState({
                            open: false, DataEntrega: valor,
                            textData: this.state.DataEntrega.toDateString()
                        })
                    }}
                    onCancel={() => { this.setState({ open: false }) }}
                />
                <View style={form.input}>
                    <Text style={form.text1}> Pago na hora                     Não  </Text>
                    <Switch
                        trackColor={{ false: "#999", true: "#FFCEE7" }}
                        thumbColor={this.state.Pago ? "#F06EAA" : "#FFCEE7"}
                        onValueChange={() => {
                            this.setState({ Pago: !this.state.Pago }),
                                this.verificarBoolPago()
                        }}
                        value={this.state.Pago}
                    />
                    <Text style={form.text1}>Sim</Text>
                </View>
                <View style={form.input}>
                    <Text style={form.text1}> Entregue                             Não  </Text>
                    <Switch
                        trackColor={{ false: "#999", true: "#FFCEE7" }}
                        thumbColor={this.state.Entregue ? "#F06EAA" : "#FFCEE7"}
                        onValueChange={() => {
                            this.setState({ Entregue: !this.state.Entregue }),
                                this.verificarBoolEntregue()
                        }}
                        value={this.state.Entregue}
                    />
                    <Text style={form.text1}>Sim</Text>
                </View>

                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarCostura(this.state.Resumo, this.state.NomeCliente,
                            this.state.Telefone, this.state.Descricao, this.state.Valor,
                            this.state.DataEntrega.toDateString(), this.state.PagoText,
                            this.state.EntregueText), this.props.navigation.navigate('ListaCosturas')
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

