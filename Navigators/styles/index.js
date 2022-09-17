import { StyleSheet } from "react-native";

const header = StyleSheet.create({
    container:{
        height: 70, backgroundColor: '#F06EAA', justifyContent: 'center', alignItems: 'center', 
    },
    image:{
        width: 278, height: 61, marginBottom: 10
    }
})

const footer = StyleSheet.create({
    container:{
        height: 40, backgroundColor: '#F06EAA', justifyContent: 'center', alignItems: 'center', 
    },
    text:{
        fontSize: 12, color: 'white', fontWeight: '500', textAlign: 'center', width: 165
    }
})

const sections = StyleSheet.create({
    container:{
        marginHorizontal: 35, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'
    },
    title:{
        fontSize: 25, color: '#F06EAA', fontWeight: '700', borderBottomColor: '#FFE8F3', borderBottomWidth: 3, 
        marginHorizontal: 35, marginTop: 10, marginBottom: 10
    },
    button:{
       width: 100, height: 100, borderRadius: 15, backgroundColor: '#FFE8F3', 
       justifyContent: 'center', marginEnd: 10, alignItems: 'center', marginBottom: 15
    },
    text:{
        fontSize: 17, fontWeight: '700', color: '#5A5959', textAlign: 'center', width: 80
    }
})
const form = StyleSheet.create({
    background:{
        flex: 1, backgroundColor: '#FFCEE7'
    },
    container1:{
        backgroundColor: '#FFE8F3', borderRadius: 15, margin: 20, flex: 1
    },
    container2:{
        height: 0, marginHorizontal: 15, marginVertical: 20, flex: 1, 
    },
    icon:{
        height: 35, width: 35, borderRadius: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
    },
    containerTitle:{
        alignItems: 'center', alignContent: 'center'
    },
    title:{
        width: 155, fontSize: 30, fontWeight: '700', color: '#F06EAA', textAlign: 'center', marginTop: -20, 
    },
    container3:{
        justifyContent: 'space-evenly', alignItems: 'center', flex: 10, marginTop: 20
    },
    container4:{
        justifyContent: 'space-evenly', alignItems: 'center', flex: 5, marginTop: 20
    },
    input:{
        width: 235, height: 30, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 5,
        justifyContent: 'space-between', alignItems: 'center', fontSize: 12
    }, 
    button:{
        width: 100, height: 40, borderRadius: 10, backgroundColor: '#F06EAA', justifyContent: 'center',
        borderWidth: 2, borderColor: 'white', marginVertical: 10
    },
    text:{
        fontSize: 15, fontWeight: '700', color: 'white', textAlign: 'center'
    }
})
const itemLista = StyleSheet.create({
    container1:{
        minHeight: 20, backgroundColor: '#FFE8F3', padding: 10, justifyContent: 'space-between',
        marginBottom: 5, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 5
    },
    container2:{
        justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', minWidth: 277, borderWidth: 0
    },
    container3:{
        justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', maxWidth: 255, borderWidth: 0
    },
    text1:{
        fontWeight: '400', fontSize: 12, marginEnd: 10, minWidth: 50, textTransform: 'uppercase'
    },
    button:{
        width: 60, height: 24, backgroundColor: '#F06EAA', justifyContent: 'center',
        borderWidth: 2, borderColor: 'white', marginVertical: 10
    },
    text2:{
        fontSize: 12, fontWeight: '700', color: 'white', textAlign: 'center'
    }
})

export { header, footer, sections, form, itemLista };
