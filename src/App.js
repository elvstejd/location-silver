import './App.css';
import Map from './components/Map';
import Listings from './components/Listings';
import { Box, Heading } from '@chakra-ui/react';
import { useListingsUpdate } from './ListingsContext';
import { useEffect } from 'react';
import listingsTestData from './testData';

function App() {
  const updateListings = useListingsUpdate();

  useEffect(() => {
    updateListings(listingsTestData);
  });

  return (
    <div className="App">
      <Box
        maxW="70rem"
        margin="0 auto"
      >
        <Heading as="h1" size="xl">ViviendaRD</Heading>
        <Map />
        <Listings />
      </Box>
    </div>

  );
}

export default App;
