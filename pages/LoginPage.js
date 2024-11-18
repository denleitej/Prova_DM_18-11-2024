import { View, Text, TextInput, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { supabase } from './supabaseClient'; 

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }
  
    const { error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) {
      setErrorMessage('Email ou senha incorretos. Tente novamente.');
    } else {
      setErrorMessage('');
      navigation.navigate('MainPage');
    }
  };
  
  return (
    <ImageBackground style={styles.outerContainer} source={require('./Imagens/campusLogin.jpg')} blurRadius={2}>
      <View style={styles.innerContainer}>
        <Image style={styles.logo} source={require('./Imagens/logo.png')} />
        <Text style={styles.t1}>Faça seu login para continuar:</Text>
        
        <TextInput style={styles.tinput} placeholder="Digite seu usuário" onChangeText={setEmail} />
        <TextInput style={styles.tinput} placeholder="Digite sua senha" secureTextEntry onChangeText={setPassword} />
      
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.clicaveis}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.t2}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.t2}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.t3}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 350,
    height: 350,
    borderRadius: 25,
  },
  tinput: {
    height: 40,
    borderColor: 'darkblue',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 7,
    width: '80%',
    color: 'gray',
  },
  clicaveis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  t1: {
    marginTop: 5,
    color: 'darkblue',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  t2: {
    color: 'gray',
  },
  t3: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  botao: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    width: 110,
    height: 40,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
