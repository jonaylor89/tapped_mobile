

import { StyleSheet, TextInput, View } from 'react-native'

const SearchBar = () => {
    return(
        <View style={styles.container}>
            <TextInput placeholder='Search for..' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%' ,
        height: 50 ,
        backgroundColor: 'black' ,
        borderRadius: 8
    }, 
    searchInput:{
        width: '100%',
        height: '100%',
        paddingLeft: 8,
        fontSize: 16
    },
});

export default SearchBar;