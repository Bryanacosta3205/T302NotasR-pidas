import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NewNoteButton from './Components/Buttons/NewNoteButton';
import NewNote from './Screens/NewNote';
import UpdateNote from './Screens/UpdateNote';
import HomeScreen from './Screens/HomeScreen';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer theme={{colors:{background:'white'}}}  >
      <Stack.Navigator  >

        <Stack.Screen options={
          ({navigation}) => ({
            headerTitleStyle:{fontSize:20},
            headerTitleAlign:'left',
            title:'Notas Rápidas',
            headerRight:()=><NewNoteButton onPress={()=>navigation.navigate('Add')} />
          })
        } name="Home" component={HomeScreen} />

        <Stack.Screen options={{headerTitleStyle:{fontSize:20},headerTitle:'Agregar Nota'}} name="Add" component={NewNote} />
        <Stack.Screen options={{headerTitleStyle:{fontSize:20},headerTitle:'Modificar Nota'}} name="Update" component={UpdateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
