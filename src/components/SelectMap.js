import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;

function SelectMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

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
        if (marker.current) return; // initialize marker only once
        marker.current = new mapboxgl.Marker({ draggable: true });
        map.current.on('click', (e) => {
            if (!marker.current) return;
            marker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
            marker.current.addTo(map.current);
            console.log(e.lngLat.wrap());
        });

        // marker.current.on('dragend', )
    });

    useEffect(() => {

    });



    return (
        <div>
            <div style={{ height: "400px" }} ref={mapContainer} className="map-container" />
        </div>
    )
}

export default SelectMap;
