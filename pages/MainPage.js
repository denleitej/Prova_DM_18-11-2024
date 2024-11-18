import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default function MainPage({ navigation }) {

  
  const toggleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.headerText}>Gerenciar Grupos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.headerText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Image source={require('./Imagens/logo.png')} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.groupsContainer}>
        <Text style={styles.welcomeMessage}>Seja Bem-Vindo!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D0075',
    paddingTop: 50,
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    zIndex: 1,
  },
  headerText: {
    color: 'black',
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  groupsContainer: {
    alignItems: 'center',
  },
  welcomeMessage: {
    color: 'white',         
    fontSize: 24,           
    fontWeight: 'bold',     
    textAlign: 'center',    
    marginTop: 50,          
  },
});
