import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useListings, useSetSelectedListing } from '../contexts/ListingsContext';
const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;


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
            const location = listing.location
            const marker = new mapboxgl.Marker()
                .setLngLat([location.long, location.lat])
                .addTo(map.current);

            marker.on('click', (data) => {
                console.log(data);
            });

            const markerEl = marker.getElement();
            markerEl.style.cursor = 'pointer';
            markerEl.id = listing._id;
            markerEl.addEventListener('click', (e) => {
                setSelectedListing(e.currentTarget.id);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listings]);

    return (
        <div>
            <div style={{ height: "400px" }} ref={mapContainer} className="map-container" />
        </div>
    )
}

export default Map;
