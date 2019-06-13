import React from 'react';
import { 
  View, 
  TextInput, 
  Text,
  Image,
  TouchableHighlight,
  StyleSheet} from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Inicio de sesión',
  };

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      token: ''
    }
  }

  componentDidMount(){
    this._loadInithialState().done();
  }

_loadInithialState = async () => {
    var value = await AsyncStorage.getItem('user');
    var token = await AsyncStorage.getItem('token');
    var correo = await AsyncStorage.getItem('correo');
    var token_expite = await AsyncStorage.getItem('token_expite');

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    str_month = new String(month);
    if (str_month.length == 1) {
      var mo = '0' + month;
    } else {
        var mo = month;
    }

    str_date = new String(date);
    if (str_date.length == 1) {
      var d = '0' + date;
    } else {
        var d = date;
    }

    var fecha = year+'-'+mo+'-'+d;

    
    if(value !== null && token !== null && correo !== null && token_expite !== null){
      var fecha_token = token_expite.substr(0,10);
      if(fecha_token > fecha){
        this.props.navigation.navigate('Profile',{
          token: token,
          correo: correo
        });
      }else{
        AsyncStorage.clear();
      }
    }
  }

  login = () =>{
      const{email,password} = this.state;
      data = {email: email, password: password};
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
          return response.json();
        }else{
          alert('Algo salió mal en el servidor de API!');
        }
      })
      .then(respuesta =>{
        AsyncStorage.setItem('user', respuesta.user);
        AsyncStorage.setItem('token', respuesta.access_token);
        AsyncStorage.setItem('correo', email);
        AsyncStorage.setItem('token_expite', respuesta.expires_at);

        this.props.navigation.navigate('Profile',{
          token: respuesta.access_token,
          correo: email
        });
      })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Correo"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Contraseña"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.login}>
          <Text style={styles.loginText}>Ingresar</Text>
        </TouchableHighlight>

       <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Cambiar')}>
            <Text>Olvidaste tu contraseña?</Text>
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
    backgroundColor: '#fff',
  },
  inputContainer: {
      borderColor: '#ccc',
      borderWidth: 2,
      borderStyle: 'solid',
      backgroundColor: '#FFFFFF',
      borderRadius:10,
      width:350,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
  },
  inputs:{
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
    borderRadius:10,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
