import Login from './screens/Login'
import App from './App'
import Register from './screens/Register'
const { Navigation } = require('react-native-navigation');
const { StyleSheet } = require('react-native');

Navigation.registerComponent('App', () => App)
Navigation.registerComponent('Register', () => Register)

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Login'
                        }
                    }
                ]
            }
        }
    });
});

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'whitesmoke',
    }
})