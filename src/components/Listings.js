import React from 'react';
import Listing from './Listing';
import { Box, Flex } from "@chakra-ui/react";
import { useListings } from '../ListingsContext';

function Listings() {
    const listings = useListings();

    return (
        <Box mt="1rem" overflow="auto">
            <Flex p="0.5rem">
                {listings.map(({ id, precio, direccion, sector }) => {
                    return <Listing
                        key={id}
                        id={id}
                        precio={precio}
                        direccion={direccion}
                        sector={sector} />
                })}
            </Flex>
        </Box>
    )
}

export default Listings;
