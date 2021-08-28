import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { useListings } from '../ListingsContext';
const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapContainer = styled.div`
    height: 400px;
`;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const listings = useListings();

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
        });
    }, [listings]);

    /*
    function handlePlaceMarker() {
        if (!map.current) return; // Don't attempt if map don't exist
        const marker1 = new mapboxgl.Marker()
            .setLngLat([12.554729, 55.70651])
            .addTo(map.current);

        marker1.on('click', (data) => {
            console.log(data);
        });

        let markerel = marker1.getElement();
        markerel.style.cursor = 'pointer';
        markerel.id = 'ASQ232D';
        markerel.addEventListener('click', (e) => {
            console.log(e.currentTarget)
            console.log('marker was clicked', e.currentTarget.id);

        })
        console.log(markerel)
    }

    */

    return (
        <div>
            <MapContainer ref={mapContainer} className="map-container" />
        </div>
    )
}

export default Map;
