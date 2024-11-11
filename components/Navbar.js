import React, { useEffect, useState } from 'react';
import { Header } from 'react-native-elements';
import { getItem } from '../util/storage'; // Asegúrate de tener esta función para obtener el nombre del usuario

export default function Navbar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            const user = await getItem('username');
            if (user) {
                setUsername(user);
            }
        };
        fetchUsername();
    }, []);

    return (
        <Header
            centerComponent={{ text: `Welcome, ${username}`, style: { color: '#fff', fontSize: 18 } }}
            containerStyle={{ backgroundColor: '#3D6DCC', justifyContent: 'space-around' }}
        />
    );
}
