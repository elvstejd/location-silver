import React from 'react';
import Listing from './Listing';
import { Box, Flex } from "@chakra-ui/react";
import { useListings } from '../contexts/ListingsContext';

function Listings() {
    const listings = useListings();

    return (
        <Box mt="1rem" overflow="auto" style={{ scrollBehavior: "smooth" }}>
            <Flex p="0.5rem">
                {listings.map(({ _id, price, address, sector, imageUrl }) => {
                    return <Listing
                        key={_id}
                        id={_id}
                        price={price}
                        address={address}
                        sector={sector}
                        imageUrl={imageUrl}
                    />
                })}
            </Flex>
        </Box>
    )
}

export default Listings;
