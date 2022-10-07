import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Switch } from 'react-native'
import { itemLista } from '../styles/index'
import Database from '../database/Database'
import DatePicker from 'react-native-date-picker'

export default class ItemCostura extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Resumo: this.props.Resumo, NomeCliente: this.props.NomeCliente, Telefone: this.props.Telefone,
            Descricao: this.props.Descricao, Valor: this.props.Valor, novaData: new Date(), DataEntrega: this.props.DataEntrega, Pago: true, Entregue: true,
            PagoText: '', EntregueText: ''
        }
        this.CheckBoolsInit()
    }

    CheckBoolsInit = () => {
        this.props.Pago == "sim" ? this.state.PagoText = "sim" : this.state.PagoText = "não"
        this.props.Pago == "sim" ? this.state.Pago = true : this.state.Pago = false
        this.props.Entregue == "sim" ? this.state.EntregueText = "sim" : this.state.EntregueText = "não"
        this.props.Entregue == "sim" ? this.state.Entregue = true : this.state.Entregue = false
    }
    CheckPago = () => {
        if (this.state.Pago) {
            this.setState({ PagoText: "não", Pago: false })
        } else {
            this.setState({ PagoText: "sim", Pago: true })
        }
    }
    CheckEntregue = () => {
        if (this.state.Entregue) {
            this.setState({ EntregueText: "não", Entregue: false })
        } else {
            this.setState({ EntregueText: "sim", Entregue: true })
        }
    }

    AtualizarResumo = (id, Resumo) => {
        const banco = new Database()
        banco.AtualizarCosturaResumo(id, Resumo)
    }
    AtualizarNome = (id, NomeCliente) => {
        const banco = new Database()
        banco.AtualizarCosturaNome(id, NomeCliente)
    }
    AtualizarTelefone = (id, Telefone) => {
        const banco = new Database()
        banco.AtualizarCosturaTelefone(id, Telefone)
    }
    AtualizarDescricao = (id, Descricao) => {
        const banco = new Database()
        banco.AtualizarCosturaDescricao(id, Descricao)
    }
    AtualizarValor = (id, Valor) => {
        const banco = new Database()
        banco.AtualizarCosturaValor(id, Valor)
    }
    AtualizarPago = (id, Pago) => {
        const banco = new Database()
        this.state.Pago ? this.state.Pago = "sim" : this.state.Pago = "não"
        banco.AtualizarCosturaPago(id, Pago)
    }
    AtualizarEntregue = (id, Entregue) => {
        const banco = new Database()
        this.state.Entregue ? this.state.Entregue = "sim" : this.state.Entregue = "não"
        banco.AtualizarCosturaEntregue(id, Entregue)
    }
    AtualizarData = (id, Data) => {
        const banco = new Database()
        banco.AtualizarCosturaData(id, Data)
    }

    render() {
        return (
            <View style={itemLista.container}>
                <View style={style.container}>
                    <View style={style.container}>
                        <View style={style.container1}>
                            <Text style={style.textTitle}>Id:</Text>
                            <Text style={style.textTitle}>Resumo:</Text>
                            <Text style={style.textTitle}>Nome do Cliente:</Text>
                            <Text style={style.textTitle}>Telefone:</Text>
                            <Text style={style.textTitle}>Descrição:</Text>
                            <Text style={style.textTitle}>Valor:    R$</Text>
                            <Text style={style.textTitle}>Data de Entrega:</Text>
                            <Text style={style.textTitle}>Pago na hora:</Text>
                            <Text style={style.textTitle}>Entregue:</Text>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text}>{this.props.id}</Text>
                            <TextInput style={style.input} placeholder={this.props.Resumo}
                                onChangeText={(valor) => { this.setState({ Resumo: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.NomeCliente}
                                onChangeText={(valor) => { this.setState({ NomeCliente: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Telefone}
                                onChangeText={(valor) => { this.setState({ Telefone: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Descricao}
                                onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Valor}
                                onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                            <Text style={style.text1}>{this.state.DataEntrega}</Text>
                            <View style={style.input}>
                                {/* <Text style={style.text1}>{this.state.PagoText}</Text> */}
                                <Text style={style.text1}>Não</Text>
                                <Switch
                                    trackColor={{ false: "#999", true: "#FFCEE7" }}
                                    thumbColor={this.state.Pago ? "#F06EAA" : "#FFCEE7"}
                                    value={this.state.Pago}
                                    onValueChange={() => { this.CheckPago() }} />
                                <Text style={style.text1}>Sim</Text>
                            </View>
                            <View style={style.input}>
                                {/* <Text style={style.text1}>{this.state.EntregueText}</Text> */}
                                <Text style={style.text1}>Não</Text>
                                <Switch
                                    trackColor={{ false: "#999", true: "#FFCEE7" }}
                                    thumbColor={this.state.Entregue ? "#F06EAA" : "#FFCEE7"}
                                    value={this.state.Entregue}
                                    onValueChange={() => { this.CheckEntregue() }} />
                                <Text style={style.text1}>Sim</Text>
                            </View>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text2}>  Editar</Text>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarResumo(this.props.id, this.state.Resumo) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarNome(this.props.id, this.state.NomeCliente) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarTelefone(this.props.id, this.state.Telefone) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarDescricao(this.props.id, this.state.Descricao) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarValor(this.props.id, this.state.Valor) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.setState({ open: true }) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <DatePicker
                                modal open={this.state.open}
                                mode="date" locale='pt-BR'
                                date={this.state.novaData}
                                onConfirm={(valor) => {
                                    this.setState({
                                        open: false,
                                        DataEntrega: valor.toDateString()
                                    }), this.AtualizarData(this.props.id, this.state.DataEntrega)
                                }}
                                onCancel={() => { this.setState({ open: false }) }}
                            />
                            <TouchableOpacity
                                onPress={() => { this.AtualizarPago(this.props.id, this.state.PagoText) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarEntregue(this.props.id, this.state.EntregueText) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.container1}>
                        <Text style={style.text2}>Excluir</Text>
                        <TouchableOpacity
                            onPress={() => { this.props.deletar(this.props.id) }}>
                            <Image source={require('../images/lixeira.png')} style={itemLista.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    container1: {
        flexDirection: 'column',
    },
    textTitle: {
        fontSize: 10, color: '#999', marginEnd: 10, minWidth: 10, height: 21.5,
    },
    text: {
        fontSize: 10, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, marginBottom: 2, 
    },
    input: {
        fontSize: 12, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, height: 22, 
        flexDirection: 'row', 
    },
    icon: {
        width: 15, height: 15, tintColor: '#F06EAA', marginStart: 10, marginBottom: 7
    },
    text1: {
        fontSize: 10, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, marginTop: 3, color: '#999', marginBottom: 5
    },
    text2: {
        fontSize: 10, color: '#999', textAlign: 'center', marginBottom: 4
    },
})