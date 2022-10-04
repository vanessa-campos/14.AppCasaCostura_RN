import { StyleSheet } from "react-native";

const header = StyleSheet.create({
    container1: {
        height: 80, backgroundColor: '#F06EAA', justifyContent: 'center', alignItems: 'center',
        borderBottomWidth: 2, borderBottomColor: '#FFE8F3',
    },
    image: {
        width: 278, height: 61, marginBottom: 0
    },    
    container2: {
        backgroundColor: '#F06EAA', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row',
    },
    button: {
        padding: 2, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', width: 100
    },
    text: {
        fontSize: 12, color: 'white', fontWeight: '500', textAlign: 'center', 
    },
    icon: {
        width: 20, height: 20, tintColor: 'white'
    },
})

const footer = StyleSheet.create({
    container: {
        height: 40, backgroundColor: '#F06EAA', justifyContent: 'center', alignItems: 'center',
        borderTopWidth: 2, borderTopColor: '#FFE8F3',
    },
    text: {
        fontSize: 12, color: 'white', fontWeight: '500', textAlign: 'center', width: 165
    }
})

const sections = StyleSheet.create({
    container: {
        marginHorizontal: 30, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 25, color: '#F06EAA', fontWeight: '700', borderBottomColor: '#FFE8F3', borderBottomWidth: 3,
        marginHorizontal: 30, marginVertical: 30,
    },
    button: {
        width: '100%', height: 50, borderColor: '#F06EAA', borderWidth: 1,
        justifyContent: 'center', alignItems: 'center', marginBottom: 25,
    },
    text: {
        fontSize: 17, fontWeight: '500', color: '#F06EAA',
    }
})
const form = StyleSheet.create({
    background: {
        backgroundColor: '#FFE8F3', borderRadius: 15, margin: 20, flex: 1,
        padding: 20, alignContent: 'center', 
    },
    containerTitle: {
        flexDirection: 'row', alignItems: 'center',  justifyContent:'flex-start',
    },
    icon: {
        width:30, height:30, tintColor: '#F06EAA'
    },
    title: {
        width: '50%', fontSize: 20, fontWeight: '700', color: '#F06EAA', textAlign: 'center', marginLeft: 40,
    },
    container1: {
        flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20
    },
    input: {
        width: '80%', height: 30, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 5,
        justifyContent: 'space-between', alignItems: 'center', fontSize: 12, marginBottom: 5,
        borderBottomWidth: 2, borderBottomColor: 'gray', borderRightWidth: 1, borderRightColor: 'gray',
    },
    button: {
        width: 80, height: 30, backgroundColor: '#F06EAA', justifyContent: 'center', marginTop: 20, borderRadius: 5, 
        borderBottomWidth: 2, borderBottomColor: 'white', borderRightWidth: 1, borderRightColor: 'white',        
    },
    text: {
        fontSize: 15, fontWeight: '700', color: 'white', textAlign: 'center'
    },  
    text1: {
        fontSize: 12, fontWeight: '400', color: '#999', textAlign: 'center'
    },    
    picker: {
        width: 250, color: '#999', 
    }
})
const itemLista = StyleSheet.create({
    container: {
        paddingVertical: 10, marginBottom: 5, 
        borderBottomColor: '#F06EAA', borderBottomWidth: 1, 
        borderTopColor: '#F06EAA', borderTopWidth: 1
    },
    icon: {
        width: 25, height: 25, tintColor: '#F06EAA', marginVertical: 5, 
    },
})

export { header, footer, sections, form, itemLista };
