import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { sections } from '../styles'

export default function Listas({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#FFCEE7', flex: 1 }}>
                <Text style={sections.title}>LISTAS</Text>
                <View style={sections.container}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ListaProdutos')} style={sections.button}>
                        <Text style={sections.text}>Produtos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ListaVendas')} style={sections.button}>
                        <Text style={sections.text}>Vendas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ListaCosturas')} style={sections.button}>
                        <Text style={sections.text}>Costuras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ListaResumo')} style={sections.button}>
                        <Text style={sections.text}>Resumo do Mês</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}