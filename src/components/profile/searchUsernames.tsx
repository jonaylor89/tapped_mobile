import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDatabase } from '../../contexts/useDatabase';

export default function Search() {
    const { database } = useDatabase();
    // onstate that has state
    // create a button that runs the search onclick
    // there was a 3rd thing john said
    const [searchInput, setSearchInput] = useState('');

    async function searchUser() {
        console.log('initial text: ', searchInput);
        const output = await database.searchUser(searchInput);
        console.log('final: ', output);
    }

    return (
        <View>
            <TextInput
                style={{ color: 'white' }}
                placeholder='Enter Username'
                autoCapitalize='none'
                onChangeText={(text: string) => setSearchInput(text)}
            />
            <Button onPress={() => searchUser()}>Search</Button>
        </View>
    );
}