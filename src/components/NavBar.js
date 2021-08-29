import { Box, Link } from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

function NavLink({ to, exact = false, children }) {
    return (
        <Link activeStyle={{ fontWeight: "bold" }} exact={exact} marginRight="1rem" color="white" as={RouterNavLink} to={to}>{children}</Link>
    );
}

function NavBar() {
    return (
        <Box
            bg="teal"
            padding="1rem 2rem"
            display="flex"
            alignItems="center"
        >
            <NavLink to="/" exact={true}>Inicio</NavLink>
            <NavLink to="/add">Registrar</NavLink>
        </Box>
    )
}

export default NavBar;
