import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const NewNoteButton = ({onPress}) => {
    
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default NewNoteButton;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: 40,
    height: 40,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
