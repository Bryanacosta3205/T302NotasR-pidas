import React, {useState} from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import SubmitButton from '../Components/Buttons/SubmitButton';
import ColorPicker from '../Components/ColorPicker';
import {useForm} from '../Hooks/useForm';
import {colors} from '../helpers/colors'
const db = SQLite.openDatabase({name: 'mydata'});

const NewNote = ({navigation}) => {
  const host = 'http://192.168.0.18:3000'
  const [color, setColor] = useState('#FFFFFF');
  
  const {title, body, onChange} = useForm({
    title: '',
    body: '',
  });

  const onSubmit = () => {
    if (title && body) {
      // db.transaction(function (t) {
      //   t.executeSql(
      //     'INSERT INTO note (id, title, body,color) VALUES (null,?,?,?)',
      //     [title, body,color],
      //     function (tx, res) {
            
      //       console.log('Nota guardada satisfactoriamente');
      //       navigation.goBack();
      //     },
      //     error => console.log({error}),
      //   );
      // });

      fetch(`${host}/newNote`,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body, color})
      })
      .then(resp => {
        navigation.goBack();
      })
      .catch(err=>console.log(err))


    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="Título de la nota"
        placeholderTextColor='#757575'
        onChangeText={value => onChange(value, 'title')}
        value={title}
      />
      <TextInput
        style={{...styles.textArea,backgroundColor:color}}
        multiline={true}
        placeholder="What needs to be done?"
        placeholderTextColor="#757575"
        onChangeText={value => onChange(value, 'body')}
        value={body}
      />

     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     {colors.map(({color},i)=>(
      <ColorPicker key={i} color={color} onPress={()=>setColor(color)} />
  ))}
     </View>

      <SubmitButton onPress={onSubmit} text="AGREGAR" />
    </View>
  );
};

export default NewNote;

const styles = StyleSheet.create({
  container: {
    height: '95%',
    margin: 15,
    display: 'flex',
    flexShrink: 1,
  },
  title: {
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#375692',
  },
  textArea: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderColor: '#b3b5ba',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    
  },
});
