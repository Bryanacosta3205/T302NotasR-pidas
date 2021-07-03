import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {Alert, Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import SubmitButton from '../Components/Buttons/SubmitButton';
import {useForm} from '../Hooks/useForm';
import {colors} from '../helpers/colors'
import ColorPicker from '../Components/ColorPicker';
const db = SQLite.openDatabase({name: 'mydata'});

const UpdateNote = ({route, navigation}) => {
  const host = 'http://192.168.0.18:3000'
  const {id, title, body,color} = route.params;
  
  const [colorF, setColor] = useState(null);
  const {titleF, bodyF, onChange } = useForm({
    title: '',
    body: '',
  });

  const onSubmit = () => {
    if (titleF || bodyF || colorF) {
      // db.transaction(tx => {
      //   tx.executeSql(
      //     'UPDATE note SET title = ?, body = ?, color = ? WHERE id = ?',
      //     [titleF ?? title, bodyF ?? body, colorF??color , id],
      //     (tx, result) => {
      //       if (result.rowsAffected.length === 0) {
      //         console.log('No se actualizaron los datos. Intente de nuevo')
      //         return;
      //       }
      //       navigation.goBack();
      //     },
      //     error => console.log(error),
      //   );
      // });

      fetch(`${host}/updateNote/${id}`,{
        method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:titleF??title, body:bodyF??body, color:colorF??color})
      })
      .then(resp => resp.json())
      .then(data=>{
        console.log(data)
        navigation.goBack()
      })
      .catch(err=>console.log(err))

    }
    Keyboard.dismiss();
  };

  const onDelete = ()=>{
    Alert.alert('Eliminar Nota','Deseas eliminar esta nota?',
    [
      {
        text:'Cancelar',
        style:'cancel'
      },
      {
        text:'Eliminar',
        onPress:()=>{
          // db.transaction(tx => {
          //   tx.executeSql(
          //     'DELETE FROM note WHERE id = ?',
          //     [id],
          //     (tx, result) => {
          //       if (result.rowsAffected.length === 0) {
          //         console.log('No se actualizaron los datos. Intente de nuevo')
          //         return;
          //       }
          //       navigation.goBack();
          //     },
          //     error => console.log(error),
          //   );
          // });
          fetch(`${host}/deleteNote/${id}`,{
            method:'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
          .then(resp => resp.json())
          .then(data=>{
            console.log(data)
            navigation.goBack()
          })
          .catch(err=>console.log(err))
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        onChangeText={value => onChange(value, 'titleF')}
        value={titleF ?? title}
      />
      <TextInput
        style={{...styles.textArea,backgroundColor:colorF??color}}
        multiline={true}
        placeholderTextColor="#757575"
        onChangeText={value => onChange(value, 'bodyF')}
        value={bodyF ?? body}
      />

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     {colors.map(({color},i)=>(
      <ColorPicker key={i} color={color} onPress={()=>setColor(color)} />
  ))}
     </View>

      <View style={styles.options}>
        <SubmitButton onPress={onSubmit} text="MODIFICAR" />
        <SubmitButton onPress={onDelete} type="danger" text="ELIMINAR" />
      </View>
    </View>
  );
};

export default UpdateNote;

const styles = StyleSheet.create({
  container: {
    height: '95%',
    margin: 15,
    display: 'flex',
    flexShrink: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
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
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
