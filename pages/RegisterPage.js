import {View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {supabase} from './supabaseClient';

export default function RegisterPage({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    
    setErrorMessage('');
    setSuccessMessage('');

   
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem. Tente novamente.');
      return;
    }

    

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    

    if (error) {
     
      if (error.message.includes('User already registered')) {
        setErrorMessage('Este e-mail já está registrado. Tente outro ou faça login.');
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setSuccessMessage('Registro concluído. Você será redirecionado para a tela de login.');
         setTimeout(() => {
      navigation.navigate('LoginPage');
    }, 2000);
    }
  };

  return (
    <ImageBackground style={styles.outerContainer} source={require('./Imagens/uvvCampus2.jpg')} blurRadius={2}>
      <View style={styles.innerContainer}>
        <Text style={styles.t1}>Faça seu cadastro:</Text>

        {/* Campo de E-mail */}
        <View style={styles.inputContainer}>
          <Text style={styles.t2}>Digite seu e-mail:</Text>
          <TextInput
            style={styles.tinput}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu Email"
            keyboardType="email-address"
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.t2}>Digite sua senha:</Text>
          <TextInput
            style={styles.tinput}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
          />
        </View>

        {/* Campo de Confirmação de Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.t2}>Confirme sua senha:</Text>
          <TextInput
            style={styles.tinput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirme sua senha"
            secureTextEntry
          />
        </View>

        {/* Exibição de Mensagens */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        {/* Botões */}
        <View style={styles.clicaveis}>
          <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.t3}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={handleRegister}>
            <Text style={styles.t3}>Confirmar</Text>
          </TouchableOpacity>
        </View>
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
    height: 400,
    borderRadius: 25,
    padding: 20,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },

  tinput: {
    height: 40,
    borderColor: 'darkblue',
    borderWidth: 1,
    textAlign: 'center',
    width: '100%',
    color: 'gray',
    borderRadius: 5,
  },

  clicaveis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  t1: {
    marginBottom: 20,
    color: 'darkblue',
    fontSize: 20,
    fontWeight: 'bold',
  },

  t2: {
    color: 'darkblue',
    textAlign: 'left',
    marginBottom: 5,
  },

  t3: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    width: '45%',
    height: 40,
    borderRadius: 10,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },

  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 15,
  },
});
