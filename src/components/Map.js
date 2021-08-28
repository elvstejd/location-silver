import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { useListings, useSetSelectedListing } from '../contexts/ListingsContext';
const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapContainer = styled.div`
    height: 400px;
`;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const listings = useListings();
    const setSelectedListing = useSetSelectedListing();

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-69.951215, 18.457368],
            zoom: 12
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait that the map exists
        listings.forEach(listing => {
            console.log(listing.id)
            const marker = new mapboxgl.Marker()
                .setLngLat([listing.long, listing.lat])
                .addTo(map.current);

            marker.on('click', (data) => {
                console.log(data);
            });

            const markerEl = marker.getElement();
            markerEl.style.cursor = 'pointer';
            markerEl.id = listing.id;
            markerEl.addEventListener('click', (e) => {
                setSelectedListing(e.currentTarget.id);
            });

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listings]);

    return (
        <div>
            <MapContainer ref={mapContainer} className="map-container" />
        </div>
    )
}

export default Map;
