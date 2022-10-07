import React, { Component } from 'react'
import { Text, TouchableOpacity, View, TextInput, ScrollView, Image, StyleSheet, Alert } from 'react-native'
import { form } from '../styles'
import Database from '../database/Database'
import Produto from '../models/Produto'
import { RNCamera } from 'react-native-camera'
import { launchImageLibrary } from "react-native-image-picker"
import { Picker } from '@react-native-picker/picker'

export default function CadastroProduto({ navigation }) {

    return (
        <ScrollView style={{ flex: 1 }}>
            <ScrollView horizontal={true} style={{ flex: 1, backgroundColor: '#FFCEE7' }}>
                <View style={form.background}>
                    <View style={form.containerTitle}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../images/voltar.png')} style={form.icon} />
                        </TouchableOpacity>
                        <Text style={form.title}>PRODUTO</Text>
                    </View>
                    <Cadastro navigation={navigation} />
                </View>
            </ScrollView>
        </ScrollView>
    )
}

export class Cadastro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Categoria: "Aviamentos", Nome: "Nome do Produto", Descricao: "Descrição", Tamanho: "Tamanho", 
            Valor: "0", Unidade: "Und", Quantidade: "0", Imagem: "", listaProdutos: []
        }
    }

    CadastrarProduto = (Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem) => {
        const novoProduto = new Produto(Categoria, Nome, Descricao, Tamanho, Valor, Unidade, Quantidade, Imagem)
        const banco = new Database()
        banco.InserirProduto(novoProduto)
    }

    TirarFoto = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, orientation: 'portrait' }
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri)
            this.setState({ Imagem: data.uri })
            console.log("Salva a imagem " + this.state.Imagem)
            Alert.alert(
                "Imagem Salva", "Pressione OK para continuar!",
                [{ text: "OK" }]
            )
        }
    }

    EscolherFoto = () => {
        const options = {
            noData: true,
            title: "Foto de avaliação",
            takePhotoButtonTitle: "Escolha uma foto",
            chooseFromLibraryButtonTitle: "Selecione da galeria uma foto",
            selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
        }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("Usuário cancelou a seleção");
            } else if (response.error) {
                console.log("Ocorreu um erro: ", response.errorMessage);
            } else {
                this.setState({ Imagem: response.assets[0].uri })
                console.log("Salva a imagem " + this.state.Imagem)
            }
        })
    }

    render() {
        return (
            <View style={style.container} >
                <View style={style.container1}>
                    <View style={style.input}>
                        <Picker
                            selectedValue={this.state.Categoria}
                            style={form.picker}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ Categoria: itemValue }) }}>
                            <Picker.Item label="Aviamentos" value="Aviamentos" />
                            <Picker.Item label="Tecidos" value="Tecidos" />
                        </Picker>
                    </View>
                    <TextInput style={style.input} placeholder=" Nome do Produto"
                        onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                    <TextInput style={style.input} placeholder=" Descrição"
                        onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
                    <TextInput style={style.input} placeholder=" Tamanho"
                        onChangeText={(valor) => { this.setState({ Tamanho: valor }) }} />
                    <TextInput style={style.input} placeholder=" Valor (R$)"
                        onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                    <View style={style.input}>
                        <Picker
                            selectedValue={this.state.Unidade}
                            style={form.picker}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ Unidade: itemValue }) }}>
                            <Picker.Item label="Und" value="Und" />
                            <Picker.Item label="Metros" value="Metros" />
                        </Picker>
                    </View>
                    <TextInput style={style.input} placeholder=" Quantidade"
                        onChangeText={(valor) => { this.setState({ Quantidade: valor }) }} />
                    <TouchableOpacity style={form.button}
                        onPress={() => {
                            this.CadastrarProduto(this.state.Categoria, this.state.Nome,
                                this.state.Descricao, this.state.Tamanho, this.state.Valor,
                                this.state.Unidade, this.state.Quantidade, this.state.Imagem),
                                this.props.navigation.navigate('ListaProdutos')
                        }}>
                        <Text style={form.text}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.container1}>
                    <Text style={cam.title}> FOTO DO PRODUTO </Text>
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
                    {this.state.Imagem == "" ? 
                        <Text style={cam.text}>Nenhuma imagem encontrada</Text> :
                        <Text style={cam.text}>Imagem selecionada</Text>}
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.TirarFoto()} style={cam.button}>
                            <Text style={cam.text}>CÂMERA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.EscolherFoto()} style={cam.button}>
                            <Text style={cam.text}>GALERIA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row', padding: 20
    },
    container1: {
        flexDirection: 'column', marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
    },
    input: {
        width: 250, height: 30, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 5,
        justifyContent: 'space-between', alignItems: 'center', fontSize: 12, marginBottom: 5,
        borderBottomWidth: 2, borderBottomColor: 'gray', borderRightWidth: 1, borderRightColor: 'gray',
    },
})
const cam = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'black',
    },
    preview: {
        height: 180, width: 160, marginVertical: 20
    },
    title: {
        fontSize: 14, color: 'gray',
    },
    button: {
        backgroundColor: 'white', borderRadius: 5, padding: 5, marginHorizontal: 5, marginTop: 10,
        borderBottomWidth: 2, borderBottomColor: 'gray', borderRightWidth: 1, borderRightColor: 'gray',
    },
    text: {
        fontSize: 12, color: 'gray', maxWidth: 160, textAlign: 'center'
    }
})