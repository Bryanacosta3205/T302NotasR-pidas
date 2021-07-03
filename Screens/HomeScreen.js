import React, {useEffect, useState} from 'react';
import { ScrollView } from "react-native-gesture-handler";
import SQLite from 'react-native-sqlite-storage'

import Nota from "../Components/Note";

const db = SQLite.openDatabase({name:'mydata'});


function HomeScreen({navigation}) {

  const host = 'http://192.168.0.18:3000'

  const [notes, setNote] = useState([]);


//   useEffect(function() {
//     db.transaction(function(t) {
//         t.executeSql(
//             'CREATE TABLE IF NOT EXISTS note (' +
//             'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
//             'title VARCHAR(128) NOT NULL,' +
//             'body VARCHAR(20) NOT NULL,' +
//             'color VARCHAR(20) NOT NULL' +
//             ');',
//             [],
//             () => console.log('CREATED TABLE note'),
//             error => console.log({error})
//         );
//     })
// }, []);

useEffect(function() {
  navigation.addListener('focus', function() {
    fetch(`${host}/getNotes`)
      .then(resp => resp.json())
      .then(({data})=>setNote(data))
      .catch(err=>console.log(err))
      // db.transaction(function(t) {
      //     t.executeSql("SELECT * FROM note",[], function(tx, res) {
      //         let data = [];
      //         for (let i = 0; i < res.rows.length; i++) {
      //             data.push(res.rows.item(i));
      //         }
      //         setNote(data);
      //     }, (error) => { console.log({ error }) });
      // });
  })
}, [navigation]);

    return (
      <ScrollView>
        {notes.map(({id,title,body,color})=>(
          <Nota key={id} color={color} title={title} body={body} onPress={
            ()=>navigation.navigate('Update',{id,title,body,color})}  />
        ))}

      </ScrollView>
    );
  }

  export default HomeScreen;