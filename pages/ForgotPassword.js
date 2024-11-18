import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { supabase } from './supabaseClient';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Por favor, insira seu e-mail.');
      return;
    }

    try {

      const { error } = await supabase.auth.api.resetPasswordForEmail(email);

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Um link de recuperação foi enviado para o seu e-mail.');
        setTimeout(() => {
          navigation.navigate('LoginPage');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar enviar o link de recuperação.');
    }
  };

  return (
    <ImageBackground style={styles.outerContainer} source={require('./Imagens/campusLogin.jpg')} blurRadius={2}>
      <View style={styles.innerContainer}>
        {/* E-mail */}
        <View style={styles.inputContainer}>
          <Text style={styles.t2}>Digite seu e-mail cadastrado:</Text>
          <TextInput
            style={styles.tinput}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
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

          <TouchableOpacity style={styles.botao} onPress={handleResetPassword}>
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
    height: 170,
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
  t2: {
    color: 'darkblue',
    textAlign: 'left',
    marginBottom: 5,
    fontWeight: 'bold',
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
    marginTop: 10,
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
