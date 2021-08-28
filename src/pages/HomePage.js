import Map from '../components/Map';
import Listings from '../components/Listings';
import { Box } from '@chakra-ui/react';

function HomePage() {
    return (
        <Box
            maxW="70rem"
            margin="0 auto"
        >
            <Map />
            <Listings />
        </Box>

    )
}

export default HomePage
