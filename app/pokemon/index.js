import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { getItem } from '../../util/storage';  // Importa el método para obtener datos

export default function ViewPokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        loadPokemons();

        const fetchUsername = async () => {
            const user = await getItem('username');  // Obtén el nombre del usuario
            setUsername(user);
        };
        fetchUsername();
    }, []);

    const loadPokemons = async () => {
        if (loading) return;
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
        const data = await response.json();
        setPokemons([...pokemons, ...data.results]);
        setPage(page + 1);
        setLoading(false);
    };

    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase()));

    const renderPokemon = ({ item }) => (
        <View 
            testID={`pokemon-container-${item.name}`} // Añadimos ID al contenedor
            style={styles.pokemonContainer}
        >
            <Text testID={`pokemon-name-${item.name}`}>{item.name}</Text>
            <Link 
                testID={`pokemon-link-${item.name}`} 
                href={`/pokemon/${item.name}`}
            >
                Details
            </Link>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text testID="welcome-text">Welcome, {username}!</Text>
            <TextInput
                testID="search-input"
                style={styles.input}
                placeholder="Search Pokemon"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                testID="pokemon-list" 
                data={filteredPokemons}
                keyExtractor={(item) => item.name}
                renderItem={renderPokemon}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? (
                    <ActivityIndicator testID="loading-indicator" />
                ) : null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    pokemonContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 10,
    },
});
