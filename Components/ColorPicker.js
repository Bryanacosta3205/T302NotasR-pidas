import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const ColorPicker = ({onPress,color}) => {
    return (
        <View style={styles.container}>
           <TouchableOpacity onPress={onPress}  style={{...styles.colorContainer,backgroundColor:color}} ></TouchableOpacity>
           
        </View>
    )
}

export default ColorPicker

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    colorContainer:{
        width:30,
        height:30,
        
        
    }
})
