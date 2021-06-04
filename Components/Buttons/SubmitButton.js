import React from 'react'
import { StyleSheet, Text, TouchableOpacity,  } from 'react-native'

const SubmitButton = ({onPress,text,type}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={type==='danger'?styles.containerDanger:styles.container}>
        <Text style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    container:{
      minWidth:'40%',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4D73BE',
      },
    containerDanger:{
      minWidth:'40%',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C63237',
      },
      text:{color: 'white', fontWeight: '400', fontSize: 20}
})
