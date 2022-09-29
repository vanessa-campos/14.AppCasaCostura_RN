import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { sections } from '../styles'

export default function Home({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFCEE7', flex: 1 }}>
                <View>
                    <Text style={sections.title}>CADASTRAR</Text>
                    <View style={sections.container}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('CadastroVenda')} style={sections.button}>
                            <Text style={sections.text}>Venda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('CadastroCostura')} style={sections.button}>
                            <Text style={sections.text}>Costura</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('CadastroProduto')} style={sections.button}>
                            <Text style={sections.text}>Produto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}