import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native'
import { itemLista } from '../styles/index'
import Database from '../database/Database'
import { RNCamera } from 'react-native-camera'
import { launchImageLibrary } from "react-native-image-picker"
import { Picker } from '@react-native-picker/picker'

export default class ItemProduto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Categoria: this.props.Categoria, Nome: this.props.Nome, Descricao: this.props.Descricao,
            Tamanho: this.props.Tamanho, Valor: this.props.Valor, Unidade: this.props.Unidade,
            Quantidade: this.props.Quantidade, Imagem: this.props.Imagem, listaProdutos: []
        }
    }

    AtualizarCategoria = (id, Categoria) => {
        const banco = new Database()
        banco.AtualizarProdutoCategoria(id, Categoria)
    }
    AtualizarNome = (id, Nome) => {
        const banco = new Database()
        banco.AtualizarProdutoNome(id, Nome)
    }
    AtualizarDescricao = (id, Descricao) => {
        const banco = new Database()
        banco.AtualizarProdutoDescricao(id, Descricao)
    }
    AtualizarTamanho = (id, Tamanho) => {
        const banco = new Database()
        banco.AtualizarProdutoTamanho(id, Tamanho)
    }
    AtualizarValor = (id, Valor) => {
        const banco = new Database()
        banco.AtualizarProdutoValor(id, Valor)
    }
    AtualizarUnidade = (id, Unidade) => {
        const banco = new Database()
        banco.AtualizarProdutoUnidade(id, Unidade)
    }
    AtualizarQuantidade = (id, Quantidade) => {
        const banco = new Database()
        banco.AtualizarProdutoQuantidade(id, Quantidade)
    }
    AtualizarImagem = (id, Imagem) => {
        const banco = new Database()
        banco.AtualizarProdutoImagem(id, Imagem)
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
        this.AtualizarImagem(this.props.id, this.state.Imagem)
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
        this.AtualizarImagem(this.props.id, this.state.Imagem)
    }

    render() {
        return (
            <View style={itemLista.container}>
                <View style={style.container}>
                    <View style={style.container}>
                        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                            {this.state.Imagem == "" ?
                                <Text style={style.textImage}>Sem imagem</Text> :
                                <Text style={style.textImage}>Imagem</Text>}
                            {this.state.Imagem == "" ?
                                <RNCamera style={style.preview}
                                    ref={ref => {
                                        this.camera = ref;
                                    }}
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
                                :
                                <Image style={style.image} source={{ uri: this.state.Imagem }}></Image>}
                            {this.state.Imagem == "" ?
                                <TouchableOpacity onPress={() => this.TirarFoto()} style={style.button}>
                                    <Text style={style.buttonText}>CÂMERA</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.EscolherFoto()} style={style.button}>
                                    <Text style={style.buttonText}>GALERIA</Text>
                                </TouchableOpacity>}
                        </View>
                        <View style={style.container1}>
                            <Text style={style.textTitle}>Id:</Text>
                            <Text style={style.textTitle}>Categoria:</Text>
                            <Text style={style.textTitle}>Nome:</Text>
                            <Text style={style.textTitle}>Descrição:</Text>
                            <Text style={style.textTitle}>Tamanho:</Text>
                            <Text style={style.textTitle}>Valor:</Text>
                            <Text style={style.textTitle}>Quantidade:</Text>
                            <Text style={style.textTitle}>Unidade:</Text>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text}>{this.props.id}</Text>
                            <View style={style.picker}>
                                <Picker
                                    selectedValue={this.state.Categoria}
                                    style={style.picker}
                                    onValueChange={(itemValue, itemIndex) => { this.setState({ Categoria: itemValue }) }}>
                                    <Picker.Item label="Aviamentos" value="Aviamentos" />
                                    <Picker.Item label="Tecidos" value="Tecidos" />
                                </Picker>
                                <Text style={style.text1}>{this.state.Categoria}</Text>
                            </View>
                            <TextInput style={style.input} placeholder={this.props.Nome}
                                onChangeText={(valor) => { this.setState({ Nome: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Descricao}
                                onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Tamanho}
                                onChangeText={(valor) => { this.setState({ Tamanho: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Valor}
                                onChangeText={(valor) => { this.setState({ Valor: valor }) }} />
                            <TextInput style={style.input} placeholder={this.props.Quantidade}
                                onChangeText={(valor) => { this.setState({ Quantidade: valor }) }} />
                            <View style={style.picker}>
                                <Picker
                                    selectedValue={this.state.Unidade}
                                    style={style.picker}
                                    onValueChange={(itemValue, itemIndex) => { this.setState({ Unidade: itemValue }) }}>
                                    <Picker.Item label="Und" value="Und" />
                                    <Picker.Item label="Metros" value="Metros" />
                                </Picker>
                                <Text style={style.text1}>{this.state.Unidade}</Text>
                            </View>
                        </View>
                        <View style={style.container1}>
                            <Text style={style.text2}>  Editar</Text>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarCategoria(this.props.id, this.state.Categoria) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarNome(this.props.id, this.state.Nome) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarDescricao(this.props.id, this.state.Descricao) }}>
                                <Image source={require('../images/editar.png')} style={style.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.AtualizarTamanho(this.props.id, this.state.Tamanho) }}>
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
                            <TouchableOpacity
                                onPress={() => { this.AtualizarUnidade(this.props.id, this.state.Unidade) }}>
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
        flexDirection: 'row', justifyContent: 'space-between',
    },
    container1: {
        flexDirection: 'column',
    },
    textTitle: {
        fontSize: 10, color: '#999', minWidth: 10, height: 19, marginHorizontal: 5
    },
    text: {
        fontSize: 10, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, marginBottom: 0
    },
    image: {
        height: 100, width: 70, borderColor: '#B3ADAD', borderWidth: 1, marginVertical: 5,
    },
    textImage: {
        fontSize: 10, color: '#999', width: 70, textAlign: 'center',
    },
    icon: {
        width: 15, height: 15, tintColor: '#F06EAA', marginStart: 10, marginBottom: 4
    },
    input: {
        fontSize: 12, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, height: 19.5, flexDirection: 'row'
    },
    text1: {
        fontSize: 10, marginEnd: 10, textTransform: 'uppercase', minWidth: 10, marginTop: 3, color: '#999', marginBottom: 5
    },
    text2: {
        fontSize: 10, color: '#999', textAlign: 'center', marginBottom: 4,
    },
    picker: {
        color: '#999', height: 20, justifyContent: 'flex-start', alignItems: 'center',
        flexDirection: 'row', minWidth: 30, marginStart: 0
    },
    preview: {
        height: 100, width: 60, marginVertical: 5, marginEnd: 10, 
    },
    button: {
        backgroundColor: 'lightgray', borderRadius: 5, alignItems: 'center', paddingVertical: 2, paddingHorizontal: 5,
        borderBottomWidth: 2, borderBottomColor: 'gray', borderRightWidth: 1, borderRightColor: 'gray',
    },
    buttonText: {
        fontSize: 10, color: 'black',
    }
})