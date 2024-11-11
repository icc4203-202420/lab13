import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';  // Importa el componente Navbar

export default function Layout({ children }) {
    return (
        <View style={styles.container}>
            <Navbar /> {/* Incluye el Navbar fijo aquí */}
            <View style={styles.content}>
                {children}  {/* Aquí se renderizan las pantallas */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
