import React, { useEffect, useRef, useState } from 'react';
import Formulario from './formulario';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Icono from '../styles/marker.png';
import L from 'leaflet';
import Axios from 'axios';

const Mapa = () => {
	const estiloIcono = L.icon({
		iconUrl: Icono,
		iconSize: [28, 45],
		iconAnchor: [15, 28],
		popupAnchor: [-3, -36],
	});
	const [coorClick, setCoorClick] = useState([]);
	const [center, setCenter] = useState({
		lat: 40.463667,
		lng: -3.74922,
		zoom: 3,
	});
	const marker = useRef();
	const [markerHistorial, setMarkerHistorial] = useState([]);

	const clickMapa = (e) => {
		setCoorClick([...coorClick, [e.latlng.lat, e.latlng.lng]]);
		marker.current.leafletElement.openPopup();
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setCenter({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
				zoom: 15,
			});
		});
	}, []);

	useEffect(() => {
		Axios('http://localhost:3100/lugares')
			.then((resultado) => {
				return resultado.data.forEach((e) =>
					setMarkerHistorial([...markerHistorial, e])
				);
			})
			.catch((error) => {
				alert(error);
			});
	}, [markerHistorial]);

	return (
		<Map
			center={[center.lat, center.lng]}
			zoom={center.zoom}
			onclick={clickMapa}
		>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{coorClick.map((elemento, index) => {
				return (
					<Marker
						icon={estiloIcono}
						ref={marker}
						key={index}
						position={elemento}
						oncontextmenu={(e) => e.target.remove()}
						draggable={true}
					>
						<Popup closeOnEscapeKey={true}>
							<Formulario posicion={elemento} marker={marker} />
						</Popup>
					</Marker>
				);
			})}
			{markerHistorial.map((e, index) => {
				return (
					<Marker
						icon={estiloIcono}
						key={index}
						position={[e.coordenadas[1], e.coordenadas[0]]}
					>
						<Popup closeOnEscapeKey={true}></Popup>
					</Marker>
				);
			})}
		</Map>
	);
};

export default Mapa;
