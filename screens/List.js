import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
const axios = require('axios');
const { Navigation } = require('react-native-navigation');

const List = (props) => {
    const [quoets, setQuoets] = useState([])

    useEffect( () => {
        async function fetchData() {
            const response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes');
            setQuoets(response.data)
        }
        fetchData();
    })

    const showItems = ({en}) => {
        return(
            <View>
                <Text>{en}</Text>
            </View>
        )
    }

    return (
        <View>
            {/* <FlatList
                data={quoets}
                renderItem={showItems}
                keyExtractor={Item => Item.id}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    
})
Navigation.registerComponent('List', () => List)
export default List;