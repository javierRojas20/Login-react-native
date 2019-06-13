import React from 'react';
import { 
  View, 
  Text,
  TouchableHighlight,
  TextInput,
  Image,
  StyleSheet } from 'react-native';

export default class Olvidaste extends React.Component {
  static navigationOptions = {
    title: 'Olvidaste contraseña',
  };

  constructor(props) {
    super(props);
    this.state = {
      email   : ''
    }
  }

  youforgot = () =>{
    const{email} = this.state;
    data = {email: email};
    fetch('url',{
      method:'post',
      headers:{
        'Content-type': 'aplication/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 200){
        alert('Hemos enviado por correo electrónico el enlace para resetear password');
      }else{
        alert('Algo salió mal en el servidor de API!');
      }
    })
}


  render() {
    return (
      <View style={styles.container}>
        <Text>Ingresar correo para restablecer contraseña</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Correo"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.youforgot}>
          <Text style={styles.loginText}>Enviar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:350,
      height:45,
      marginBottom:20,
      marginTop: 10,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:350,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});