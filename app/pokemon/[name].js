import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PokemonDetails() {
    const { name } = useLocalSearchParams();  // Obtén el nombre del Pokémon desde los parámetros de la URL
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();  // Usa el hook useRouter para manejar la navegación

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                setPokemonDetails(data);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [name]);

    if (loading) {
        return (
            <View style={styles.loadingContainer} >
                <ActivityIndicator size="large" color="#0000ff" />
                <Button title="Go Back" onPress={() => router.back()} testID='go-back-button'/> {/* Botón para volver atrás */}
            </View>
        );
    }

    if (!pokemonDetails) {
        return (
            <View style={styles.container} >
                <Text>Pokemon not found!</Text>
                <Button title="Go Back" onPress={() => router.back()} testID='go-back-button'/> {/* Botón para volver atrás */}
            </View>
        );
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >{pokemonDetails.name.toUpperCase()}</Text>
            <Image
                source={{ uri: pokemonDetails.sprites.front_default }}
                style={styles.image}
            />
            <Text style={styles.subtitle}>Stats:</Text>
            <FlatList
                data={pokemonDetails.stats}
                keyExtractor={(item) => item.stat.name}
                renderItem={({ item }) => (
                    <View style={styles.statContainer}>
                        <Text>{item.stat.name}: {item.base_stat}</Text>
                    </View>
                )}
            />

            <Text style={styles.subtitle}>Sprites:</Text>
            <FlatList
                data={Object.values(pokemonDetails.sprites).filter(sprite => typeof sprite === 'string')}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Image
                        source={{ uri: item }}
                        style={styles.sprite}
                    />
                )}
                horizontal
            />

            
            {/* Botón para regresar a la pantalla anterior */}
            <Button title="Go Back" onPress={() => router.back()} testID='go-back-button'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statContainer: {
        paddingVertical: 5,
    },
    sprite: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
});
