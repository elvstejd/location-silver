import { useState, useContext, createContext } from 'react';

const ListingsContext = createContext();
const ListingsUpdateContext = createContext();

export function useListings() {
    return useContext(ListingsContext);
}

export function useListingsUpdate() {
    return useContext(ListingsUpdateContext);
}

export function ListingsProvider({ children }) {
    const [listings, setListings] = useState([]);

    /**
     * @param {Array} listings Array of listings
     */
    function updateListings(listings) {
        setListings(listings)
    }

    return (
        <ListingsContext.Provider value={listings}>
            <ListingsUpdateContext.Provider value={updateListings}>
                {children}
            </ListingsUpdateContext.Provider>
        </ListingsContext.Provider>
    )
}