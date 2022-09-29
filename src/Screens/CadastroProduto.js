import React, { Component } from 'react'
import { Text, TouchableOpacity, View, TextInput, Alert, ScrollView, Image } from 'react-native'
import { form, cam } from '../styles'
import { RNCamera } from 'react-native-camera'
import Database from '../database/Database'
import Produto from '../models/Produto'

export default function CadastroProduto({ navigation }) {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
            <View style={form.background}>
                <View style={form.containerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../images/voltar.png')} style={form.icon} />
                    </TouchableOpacity>
                    <Text style={form.title}>PRODUTO</Text>
                </View>
                <Cadastro navigation={navigation}/>
            </View>
        </ScrollView>
    )
}

export class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Categoria: "", Nome: "", Descricao: "", Tamanho: "", Valor: "", 
            Unidade: "", Quantidade: "", Imagem: "", listaProdutos: []
        }
    }

    CadastrarProduto = (Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem) => {
        const novoProduto = new Produto(Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem)
        const banco = new Database()
        banco.InserirProduto(novoProduto)
    }

    TirarFoto = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, orientation: 'portrait'}
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri)
            this.setState({ Imagem: data.uri })
            console.log("Salva a imagem " + this.state.Imagem)
            Alert.alert(
                "Imagem Salva", "Pressione OK para continuar!",
                [ { text: "OK" } ]
            )
        }
    }
    

    render() {
        return (
            <View style={form.container1}>

                <TextInput style={form.input} placeholder="Categoria (Aviamentos/Tecidos)"
                    onChangeText={(valor) => { this.setState({ Categoria: valor }) }} />
                <TextInput style={form.input} placeholder=" Nome do Produto"
                    onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                <TextInput style={form.input} placeholder=" Descrição"
                    onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
                <TextInput style={form.input} placeholder=" Tamanho"
                    onChangeText={(valor) => { this.setState({ Tamanho: valor }) }} />
                <TextInput style={form.input} placeholder=" Valor (R$)"
                    onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                <TextInput style={form.input} placeholder="Unidade (Und/Metro)"
                    onChangeText={(valor) => { this.setState({ Unidade: valor }) }} />
                <TextInput style={form.input} placeholder=" Quantidade"
                    onChangeText={(valor) => { this.setState({ Quantidade: valor }) }} />

                <Text style={cam.title}>Tire uma foto do produto</Text>

                <RNCamera 
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={cam.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.TirarFoto()} style={cam.button}>
                        <Text style={cam.text}> TIRAR FOTO </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={form.button}
                    onPress={() => {
                        this.CadastrarProduto(this.state.Categoria, this.state.Nome, 
                        this.state.Descricao, this.state.Tamanho, this.state.Valor, 
                        this.state.Unidade, this.state.Quantidade, this.props.Imagem),
                        this.props.navigation.navigate('ListaProdutos')    
                    }}>
                    <Text style={form.text}>Salvar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
