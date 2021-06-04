import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Nota = ({title,body,color,onPress}) => {
   
    return (
        <TouchableOpacity style={{...styles.container,backgroundColor:color}} onPress={onPress}>
            <Text style={styles.title} >{title}</Text>
            <Text> {body} </Text>
        </TouchableOpacity>
    )
}

export default Nota

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FBE6A3',
        padding:10,
        marginLeft:15,
        marginRight:15,
        marginTop:15,
        borderWidth:1,
        borderColor:'lightgray',
        
    },
    title:{
        fontWeight:'bold',
        fontSize:20
    }
})
