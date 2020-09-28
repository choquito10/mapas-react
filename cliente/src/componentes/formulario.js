import React from 'react';
import Axios from 'axios';

const formulario = ({ posicion, marker }) => {
	const enter = async (e) => {
		try {
			e.preventDefault(e);
			const resultado = await busqueda({
				titulo: e.target.lugar.value,
				comentario: e.target.descripcion.value,
				coordenadas: [posicion[1], posicion[0]],
			});
			marker.current.leafletElement.closePopup();
			alert(resultado.data);
		} catch (error) {
			alert(error);
			marker.current.leafletElement.remove();
			marker.current.leafletElement.closePopup();
		}
	};

	const busqueda = async ({ titulo, comentario, coordenadas }) => {
		try {
			let resultado = await Axios({
				method: 'post',
				url: 'http://localhost:3100/lugares/nuevo',
				data: {
					titulo,
					comentario,
					coordenadas,
				},
			});
			return resultado;
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<form id='form' onSubmit={enter}>
			<label htmlFor='lugar'>Lugar</label>
			<input type='text' name='lugar' id='lugar' required />
			<label htmlFor='descripcion'>Comentarios Del Lugar:</label>
			<textarea
				name='descripcion'
				id='descripcion'
				rows='3'
				cols='20'
				required
			></textarea>
			<button className='boton' type='submit'>
				Guardar Info
			</button>
		</form>
	);
};

export default formulario;
