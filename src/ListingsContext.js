import { useState, useContext, createContext } from 'react';

const ListingsContext = createContext();
const ListingsUpdateContext = createContext();
const SelectedListingContext = createContext();
const UpdateSelectedListingContext = createContext();

export function useListings() {
    return useContext(ListingsContext);
}

export function useListingsUpdate() {
    return useContext(ListingsUpdateContext);
}

export function useSelectedListing() {
    return useContext(SelectedListingContext);
}

export function useSetSelectedListing() {
    return useContext(UpdateSelectedListingContext);
}

export function ListingsProvider({ children }) {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);

    return (
        <ListingsContext.Provider value={listings}>
            <ListingsUpdateContext.Provider value={setListings}>
                <SelectedListingContext.Provider value={selectedListing}>
                    <UpdateSelectedListingContext.Provider value={setSelectedListing}>
                        {children}
                    </UpdateSelectedListingContext.Provider>
                </SelectedListingContext.Provider>
            </ListingsUpdateContext.Provider>
        </ListingsContext.Provider>
    )
}