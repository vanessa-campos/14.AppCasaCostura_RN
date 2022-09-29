import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Image, ScrollView } from 'react-native';
import { form } from '../styles';
import Database from '../database/Database'
import Produto from '../models/Produto'

export class Editar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Categoria: "", Nome: "", Descricao: "", Tamanho: "", Valor: "", Unidade: "", Quantidade: ""
        }
    }

    // EditarProduto = (id) => {
    //     const banco = new Database()
    //     banco.EditarProduto(id)
    // }

    render() {
        return (
            <View style={form.container1}>

                <TextInput style={form.input} placeholder="Categoria (Aviamentos/Tecidos)"
                    onChangeText={(valor) => { this.setState({ Categoria: valor }) }} />
                <TextInput style={form.input} placeholder=" Nome do Produto"
                    onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                <TextInput style={form.input} placeholder=" Descrição"
                    onChangeText={(valor) => { this.setState({ Descicao: valor }) }} />
                <TextInput style={form.input} placeholder=" Tamanho"
                    onChangeText={(valor) => { this.setState({ Tamanho: valor }) }} />
                <TextInput style={form.input} placeholder=" Valor (R$)"
                    onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                <TextInput style={form.input} placeholder="Unidade (Und/Metro)"
                    onChangeText={(valor) => { this.setState({ Unidade: valor }) }} />
                <TextInput style={form.input} placeholder=" Quantidade"
                    onChangeText={(valor) => { this.setState({ Quantidade: valor }) }} />

                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarProduto(this.state.Categoria, this.state.Nome, this.state.Descricao,
                            this.state.Tamanho, this.state.Valor, this.state.Unidade, this.state.Quantidade),
                            Alert.alert(
                                "Confira em Lista de Produtos",
                                "Edição realizada com sucesso!",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default function EditarProduto({ navigation }) {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListaProdutos')}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <View style={form.containerTitle}><Text style={form.title}>EDITAR PRODUTO</Text></View>
                </View>
                <Editar />
            </View>
        </ScrollView>
    )
}