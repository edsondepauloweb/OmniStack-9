import React, { useState } from 'react';
import { AsyncStorage, Alert, TextInput, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, {
                date
            },{
                headers: {user_id}
            }
        );

        Alert.alert('Solicitação de Reserva Enviada!');
    
        navigation.navigate('List');
      }

      function handleCancel(){
        navigation.navigate('List');
      }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} />
        <View style={styles.form}>
            <Text  style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.buttonCancel]}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonCancel: {
        marginTop: 10,
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});