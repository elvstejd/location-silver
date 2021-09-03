import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
const { REACT_APP_MAPBOX_ACCESS_TOKEN } = process.env;

mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;

function SelectMap({ setFieldValue, setFieldTouched }) {
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
            const location = e.lngLat;
            marker.current.setLngLat([location.lng, location.lat]);
            marker.current.addTo(map.current);
            console.log(location);
            console.log(e.lngLat.wrap());
            setFieldValue('location', { long: location.lng, lat: location.lat });
            setFieldTouched('location', true);
        });

        marker.current.on('dragend', e => {
            const location = e.target._lngLat;
            console.log(location);
            console.log('dragend, location set');
            setFieldValue('location', { long: location.lng, lat: location.lat });
        });
    });

    return (
        <div>
            <div style={{ height: "400px" }} ref={mapContainer} className="map-container" />
        </div>
    )
}

export default SelectMap;
