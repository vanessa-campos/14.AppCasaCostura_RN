import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { form, header, footer } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Database from '../database/Database'
import Venda from '../models/Venda'
import ItemProduto from '../components/ItemProduto'

export class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Nome: "", Descricao: "", Tamanho: "", Valor: "", Quantidade: "", ValorTotal: "", Data: new Date().toDateString,
            listaVendas: [], listaProdutos: [], selecao: "", dadosFiltrados: []
        }
        // this.Conta()
    }

    CadastrarVenda = (Nome, Valor, Quantidade, ValorTotal, Data) => {
        const novaVenda = new Venda(Nome, Valor, Quantidade, ValorTotal, Data)
        const banco = new Database()
        banco.InserirVenda(novaVenda)
        banco.ListarVendas().then(lista => { this.setState({ listaVendas: lista }) })
    }

    ListarVendas = () => {
        const banco = new Database()
        banco.ListarVendas().then(lista => { this.setState({ listaVendas: lista }) })
    }
    ListarProdutos = () => {
        const banco = new Database()
        banco.ListarProdutos().then(lista => { this.setState({ listaProdutos: lista }) })
    }

    Conta = () => {
        this.setState({ ValorTotal: this.state.Valor * this.state.Quantidade })        
    }

    Filtrar = (texto) => {
        this.setState({selecao: texto})
        let filtro = this.state.listaProdutos.filter(
            (item) => {
                return item.Nome.toLowerCase().includes(texto.toLowerCase())
            }
        )
        this.setState({dadosFiltrados: filtro})
    }

    //this.state.dadosFiltrados && this.state.dadosFiltrados.length > 0 ? this.state.dadosFiltrados : this.state.listaProdutos

    render() {
        return (
            <View style={form.container3}>
                <TextInput style={form.input} placeholder="Nome do Produto" onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                <TextInput style={form.input} placeholder="Valor (R$)" onChangeText={(valor) => { this.setState({ Valor: valor })}} />
                <TextInput style={form.input} placeholder="Quantidade" onChangeText={(valor) => { this.setState({ Quantidade: valor })}} />
                <Text style={form.input}>{this.state.ValorTotal}</Text>
                {/* <Text style={form.input}> */}
                    <Text style={form.text}>{this.state.Data}</Text>
                    {/* </Text> */}
                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarVenda(this.state.Nome, this.state.Valor, this.state.Quantidade, this.state.ValorTotal, this.state.Data)
                        // this.props.changescreen
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default function CadastroVenda({ navigation }) {

    const ChangeScreen = () => {
        navigation.navigate('ListaProdutos')
    }

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
                    <View style={form.containerTitle}><Text style={form.title}>VENDA</Text></View>
                </View>
                <Cadastro />
                {/* <Cadastro changescreen={ChangeScreen}/> */}
            </View>
            <View style={footer.container}>
                <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
            </View>
        </View>
    )
}


{/* <View style={form.input}>
    <TextInput placeholder="- Categoria" onChangeText={(valor) => { this.setState({ categoria2: valor }) }} />
    <FontAwesomeIcon icon={faAngleDown} color={'#999'} size={15} />
</View>
<View style={form.input}>
    <TextInput placeholder="- Produto" onChangeText={(valor) => { this.setState({ nomeProduto2: valor }) }} />
    <FontAwesomeIcon icon={faAngleDown} color={'#999'} size={15} />
</View>
<View style={form.input}>
    <TextInput placeholder="- Filtro de A a Z" onChangeText={(valor) => { this.setState({ filtro2: valor }) }} />
    <FontAwesomeIcon icon={faAngleDown} color={'#999'} size={15} />
</View> */}