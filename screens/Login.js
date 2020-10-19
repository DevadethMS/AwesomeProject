import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import App from '../App'
const axios = require('axios');
const { Navigation } = require('react-native-navigation');

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        failed: false
    }
    
    onLogin = async () => {
        try {
            const response = await axios.post('https://reqres.in/api/login', {
                "email": this.state.username,
                "password": this.state.password
            })

            if(response['status'] == 200) 
                Navigation.setRoot(mainRoot)         
        }
        catch(error) {
            this.setState({
                failed: true
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
                onPress={() =>  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'Register',
                    }
                  })
                  }
                >
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.loginButton}
                onPress={this.onLogin}
                >
                    <Text style={{color: "white"}}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{color: "red"}}>{this.state.failed ? "Login Failed" : ""} </Text>
            </View>
        </View>
        )
    }
}

Login.options = {
    topBar: {
        title: {
            text: "Login",
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
        flexDirection: "row",
        alignItems: "flex-start",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#4d089a",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    registerButton: {
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        marginRight: 20,
    },
    textInput : {
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        margin: 10,
        width: 250,
      },
})

Navigation.registerComponent('App', () => App)

const mainRoot = {
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'App'
                  }
                },
              ]
            }
          }
        ]
      }
    }
}

Navigation.registerComponent('Login', () => Login)
export default Login;
