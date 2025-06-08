import React,{useState, useRef} from "react";
import { View,Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image, Keyboard } from "react-native";
import api from "./src/services/api";

export default function App(){

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] =  useState(null);

  function limpar(){
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

   async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return; //
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Garantir que o teclado sera fechado!

    }catch(error){
      console.log('ERROR: ' + error);
    }


  }


  return(
    <SafeAreaView style = {styles.container}>
    <View style = {{alignItems: 'center'}}>
      <Image 
      style = {styles.logo}
      source={require('./src/img/img_logo.jpg')}
      
      />
      <Text style = {styles.text}>DIGITE O CEP:</Text>
      <TextInput 
      style = {styles.input}
      placeholder="Ex: 79003241"
      value = {cep}
      onChangeText={(text) => setCep(text)}
      keyboardType="numeric"
      ref = {inputRef}
      />
    </View>

    <View style = {styles.areaBnt}>
      <TouchableOpacity style = {styles.bnt}
      onPress = {buscar}
      >
        <Text style = {styles.textBnt} >BUSCAR</Text>
      </TouchableOpacity>



      <TouchableOpacity style = {styles.bnt}
      onPress = {limpar}
      >
        <Text style = {styles.textBnt}>LIMPAR</Text>
      </TouchableOpacity>
    </View>


    {cepUser &&
    <View style = {styles.resultado}>
      <Text style = {styles.textResultado}>CEP: {cepUser.cep}</Text>
      <Text style = {styles.textResultado}> LOUGADORO: {cepUser.logradouro} </Text>
      <Text style = {styles.textResultado}> BAIRRO: {cepUser.bairro}</Text>
      <Text style = {styles.textResultado}> CIDADE: {cepUser.localidade}</Text>
      <Text style = {styles.textResultado}> ESTADO: {cepUser.uf}</Text>
    </View>
    
    }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor: '#ffb6c1'
},
text:{
  marginTop: 25,
  marginBottom: 15,
  fontSize:25,
  fontWeight: 'bold',
  color: '#FFF'
},
input:{
  backgroundColor: '#ffe4e1',
  borderWidth: 1,
  borderColor: '#ff1493',
  borderRadius: 5,
  width: '90%',
  padding: 10,
  fontSize: 18,
  
},
areaBnt:{
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: 15,
  justifyContent: 'space-around'
},
bnt:{
  height: 50,
  justifyContent: 'center',
  alignItems:'center',
  padding: 14,
  borderRadius: 5,
  backgroundColor: '#ff1493'
},
textBnt:{
  color: '#FFF',
  fontSize: 20
},
logo:{
  marginTop: 20,
  width: 120,
  height: 120,
  borderRadius: 60
},
resultado:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  
},
textResultado:{
  fontSize: 23,
  color:'#FFF'
}
});