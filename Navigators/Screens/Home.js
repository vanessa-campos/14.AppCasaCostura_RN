import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { header, footer, sections } from '../styles'

export default function Home({navigation}) {

    return (
        <View>
            <View style={header.container}>
                <Image source={require('../images/logo.png')} style={header.image} />
            </View>

            <View style={{ backgroundColor: '#FFCEE7' }}>
                <View>
                    <Text style={sections.title}>CADASTRAR</Text>
                    <ScrollView horizontal style={{marginHorizontal: 35}}>
                        <TouchableOpacity onPress={() => navigation.navigate('CadastroVenda')} style={sections.button}>
                            <Text style={sections.text}>Venda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CadastroCostura')} style={sections.button}>
                            <Text style={sections.text}>Costura</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CadastroProduto')} style={sections.button}>
                            <Text style={sections.text}>Produto</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View>
                    <Text style={sections.title}>LISTAS</Text>
                    <View style={sections.container}>                        
                        <TouchableOpacity onPress={() => navigation.navigate('ListaProdutos')} style={sections.button}>
                            <Text style={sections.text}>Produtos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ListaVendas')} style={sections.button}>
                            <Text style={sections.text}>Vendas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ListaCosturas')} style={sections.button}>
                            <Text style={sections.text}>Costuras</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ListaResumo')} style={sections.button}>
                            <Text style={sections.text}>Resumo do Mês</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={footer.container}>
                <Text style={footer.text}>© 2022 - A Casa da Costura   Todos os direitos reservados</Text>
            </View>
        </View>
    )
}