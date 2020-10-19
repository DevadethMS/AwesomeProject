import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import App from '../App'
const axios = require('axios');
const { Navigation } = require('react-native-navigation');

class Register extends React.Component {
    state = {
        username: "",
        password: "",
        error: false,
        success: false
    }
    
    onRegister = async () => {
        try {
            const response = await axios.post('https://reqres.in/api/register?page=2', {
                "email": this.state.username,
                "password": this.state.password
            })

            if(response['status'] == 200) {
                this.setState({
                    success: true,
                    error: false
                })
            }
        }
        catch(error) {
            this.setState({
                error: true,
                success: false
            })
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({
                        username: text
                    }) }}
                />
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({
                        password: text
                    }) }}
                />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                style={styles.registerButton}
                onPress={this.onRegister}
                >
                    <Text style={{color: "white"}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{color: "green"}}>{this.state.success ? "You are registed" : ""} </Text>
                <Text style={{color: "red"}}>{this.state.error ? "Registration Failed" : ""} </Text>
            </View>
        </View>
        )
    }
}

Register.options = {
    topBar: {
        title: {
            text: "Register",
            color: "white"
        },
        background: {
            color: "#4d089a"
        }
    }
}

const styles = StyleSheet.create({
    textBox: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: 10,
    },
    buttons: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    registerButton: {
        backgroundColor: "#4d089a",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    textInput : {
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        margin: 10,
        width: 250,
      },
})

export default Register;
