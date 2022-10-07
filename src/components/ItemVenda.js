import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { itemLista } from '../styles/index'
import Database from '../database/Database'
import DatePicker from 'react-native-date-picker'

export default class ItemVenda extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Nome: this.props.Nome, Valor: this.props.Valor, Quantidade: this.props.Quantidade, ValorTotal: this.props.ValorTotal, Data: this.props.Data, novaData: new Date()
        }
    }

    AtualizarNome = (id, Nome) => {
        const banco = new Database()
        banco.AtualizarVendaNome(id, Nome)
    }
    AtualizarValor = (id, Valor) => {
        const banco = new Database()
        banco.AtualizarVendaValor(id, Valor)
    }
    AtualizarQuantidade = (id, Quantidade) => {
        const banco = new Database()
        banco.AtualizarVendaQuantidade(id, Quantidade)
    }
    AtualizarData = (id, Data) => {
        const banco = new Database()
        banco.AtualizarVendaData(id, Data)
    }

    render() {
        return (
            <View style={itemLista.container}>
                <View style={style.container}>
                    <View style={style.container}>
                        <View style={style.container1}>
                            <Text style={style.textTitle}>Id:</Text>
                            <Text style={style.textTitle}>Nome:</Text>
                            <Text style={style.textTitle}>Valor:             R$</Text>
                            <Text style={style.textTitle}>Quantidade:</Text>
                            <Text style={style.textTitle}>Valor Total:   R$</Text>
                            <Text style={style.textTitle}>Data:</Text>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text}>{this.props.id}</Text>
                            <TextInput style={style.input} placeholder={this.props.Nome}
                                onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Valor}
                                onChangeText={(valor) => { this.setState({ Valor: valor, ValorTotal: this.state.Quantidade * valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Quantidade}
                                onChangeText={(valor) => { this.setState({ Quantidade: valor, ValorTotal: this.state.Valor * valor }) }} />
                            <Text style={style.text}>{this.state.ValorTotal}</Text>
                            <Text style={style.text1}>{this.state.Data}</Text>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text2}>  Editar</Text>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarNome(this.props.id, this.state.Nome) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarValor(this.props.id, this.state.Valor) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarQuantidade(this.props.id, this.state.Quantidade) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <Text></Text>
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
                                        Data: valor.toDateString()
                                    }), this.AtualizarData(this.props.id, this.state.Data)
                                }}
                                onCancel={() => { this.setState({ open: false }) }}
                            />
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
            </View>
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
        fontSize: 10, color: '#999', marginEnd: 10, minWidth: 10, marginBottom: 6
    },
    text: {
        fontSize: 10, marginEnd: 10, textTransform: 'uppercase', minWidth: 10,
    },
    input: {
        fontSize: 12, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, height: 22,
    },
    icon: {
        width: 15, height: 15, tintColor: '#F06EAA', marginStart: 10, marginBottom: 5
    },
    text1: {
        fontSize: 10, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, marginTop: 5, color: '#999',
    },
    text2: {
        fontSize: 10, color: '#999', textAlign: 'center', marginBottom: 4
    },
})