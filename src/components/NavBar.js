import { Box, Button, Link } from '@chakra-ui/react';
import { NavLink as RouterNavLink, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NavLink({ to, exact = false, children }) {
    return (
        <Link activeStyle={{ fontWeight: "bold" }} exact={exact} marginRight="1rem" color="white" as={RouterNavLink} to={to}>{children}</Link>
    );
}

function NavBar() {
    const { currentUser } = useAuth();
    const location = useLocation();

    return (
        <Box
            bg="teal"
            padding="1rem 2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <NavLink to="/" exact={true}>Inicio</NavLink>
            {currentUser ? (
                ((location.pathname !== "/dashboard") && <Button colorScheme="blue"><RouterLink to="/Dashboard">Dashboard</RouterLink></Button>)
            ) : (
                ((location.pathname !== "/login") && <Button colorScheme="blue"><RouterLink to="/login">Iniciar sesión</RouterLink></Button>)
            )}

        </Box>
    )
}

export default NavBar;
