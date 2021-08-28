import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import { Container } from '@material-ui/core';
import { useSelectedListing } from '../contexts/ListingsContext';

function Listing({ id, direccion, precio, sector }) {
    const [isSelected, setIsSelected] = useState(false);
    const selectedListing = useSelectedListing();
    const listingRef = useRef(null);

    useEffect(() => {
        if (!selectedListing) return;
        if (selectedListing === id) {
            setIsSelected(true);
            listingRef.current.scrollIntoView();
        } else {
            setIsSelected(false);
        }
    }, [selectedListing, id]);

    const handleButtonClick = () => {
        setIsSelected(!isSelected);
    }

    return (
        <Box
            ref={listingRef}
            minW="15rem"
            maxW="15rem"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mr="1rem"
            boxShadow={isSelected ? "outline" : "base"}
        >
            <Box>
                <Image objectFit="cover" src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="something"></Image>
            </Box>
            <Box m="0.5rem">
                <Box>
                    <Text fontWeight="semibold" isTruncated>{direccion}</Text>
                    <Text fontWeight="bold" fontSize="lg">RD${precio}</Text>
                    <Text color="gray.800">{sector}</Text>
                </Box>
                <Box d="flex" justifyContent="center">
                    <Button onClick={handleButtonClick} colorScheme="teal" size="sm">Detalles</Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Listing;
