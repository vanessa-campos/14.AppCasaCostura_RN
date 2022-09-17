import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { form, header, footer } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { render } from 'react-dom';
import Database from '../database/Database'
import Costura from '../models/Costura'

export class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Resumo: "", NomeCliente: "", Telefone: "", Descricao: "", Valor: "", DataEntrega: "", Pago: "", Entregue: "", listaCosturas: []
        }
    }

    CadastrarCostura = (Resumo, NomeCliente, Descricao, Valor, DataEntrega, Pago, Entregue) => {
        const novaCostura = new Costura(Resumo, NomeCliente, Descricao, Valor, DataEntrega, Pago, Entregue)
        const banco = new Database()
        banco.InserirCostura(novaCostura)
        banco.ListarCostura().then(lista => { this.setState({ listaCosturas: lista }) })
    }

    ListarCosturas = () => {
        const banco = new Database()
        banco.ListarCosturas().then(lista => { this.setState({ listaCosturas: lista }) })
    }

    render() {
        return (
            <View style={form.container3}>
                <TextInput style={form.input} placeholder="Resumo" 
                onChangeText={(valor) => { this.setState({ Resumo: valor }) }} />
                <TextInput style={form.input} placeholder="Nome do Cliente" 
                onChangeText={(valor) => { this.setState({ NomeCliente: valor }) }} />
                <TextInput style={form.input} placeholder="Telefone (XX XXXXX-XXXX)" 
                onChangeText={(valor) => { this.setState({ Telefone: valor }) }} />
                <TextInput style={form.input} placeholder="Descrição" 
                onChangeText={(valor) => { this.setState({ Telefone: valor }) }} />
                <TextInput style={form.input} placeholder="Valor (R$)" 
                onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                <TextInput style={form.input} placeholder="Data de Entrega (XX/XX/XXXX)" 
                onChangeText={(valor) => { this.setState({ DataEntrega: valor }) }} />
                <TextInput style={form.input} placeholder="Pago na hora (Sim/Não)" 
                onChangeText={(valor) => { this.setState({ Pago: valor }) }} />
                <TextInput style={form.input} placeholder="Entregue (Sim/Não)" 
                onChangeText={(valor) => { this.setState({ Entregue: valor }) }} />
                <TouchableOpacity style={form.button}
                    onPress={() => { 
                        this.CadastrarCostura(Resumo, NomeCliente, Descricao, Valor, DataEntrega, Pago, Entregue),
                        Alert.alert(
                            "Confira em Lista de Costuras",
                            "Cadastro realizado com sucesso!",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

export default function CadastroCostura({ navigation }) {

    return (
        <View style={form.background}>
            <View style={header.container}>
                <Image source={require('../images/logo.png')} style={header.image} />
            </View>

            <View style={form.container1}>
                <View style={form.container2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={form.icon}>
                        <FontAwesomeIcon icon={faArrowLeftLong} color={'#999'} size={15} />
                    </TouchableOpacity>
                    <View style={form.containerTitle}><Text style={form.title}>COSTURA</Text></View>
                </View>
                <Cadastro />
            </View>
            <View style={footer.container}>
                <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
            </View>
        </View>
    )
}
