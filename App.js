import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
const { Navigation } = require('react-native-navigation');
const axios = require('axios');

class App extends React.Component {

  state = {
    list: "",
    test: "testing"
  }

  getList = async () => {
    try{
      let response = await axios.get('https://reqres.in/api/users?page=2')
      this.setState({
        list: [...this.state.list,response.data.data]
      })
    }
    catch(error) {
      console.log(error)
    }
    
  }

  componentDidMount() {
    this.getList()
  }

  showItems = (items) => {
    return(
        <View style={styles.listItem}>
            <Text>{items.item.email}</Text>
        </View>
      )
  }

  render() {
    if(this.state.list.length == 0) {
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      )
    } 
    else {
      return(
        <View style={styles.container}>
          <FlatList
            data={this.state.list[0]}
            renderItem={this.showItems}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )
    }
  }
}

App.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#efefef"
  }
})
// Navigation.registerComponent('App', () => App)
export default App;