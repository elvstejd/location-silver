import { Divider, Heading, Box, UnorderedList, ListItem, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../hooks/useUser';
import React from 'react';

function DashboardPage() {
    const history = useHistory();
    const { logout } = useAuth();
    const { name } = useUser();
    async function handleLogout() {
        try {
            await logout();
            history.push('/');
        } catch (err) {
            console.log('log out error', err);
        }
    }

    return (
        <Box
            maxW="70rem"
            margin="0 auto"
            pt="1rem"
        >
            <Heading size="lg">Hola, {name}</Heading>
            <Divider></Divider>
            <Heading size="md" pt="2rem">Opciones</Heading>
            <UnorderedList>
                <ListItem><Link to="/add" as={RouterLink}>Añadir propiedad</Link></ListItem>
                <ListItem><Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button></ListItem>
            </UnorderedList>


        </Box>
    )
}

export default DashboardPage;
