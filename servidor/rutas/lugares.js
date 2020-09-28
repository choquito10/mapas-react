const { Router } = require('express');
const ruta = Router();
const {
	guardarDatos,
	obtenerLugares,
} = require('../servicios/servicioLugares');

ruta.post('/nuevo', async (req, res, next) => {
	try {
		await guardarDatos(req.body);
		res.json('Se guardaron los datos correctamente').status(200);
	} catch (error) {
		next(error.message);
	}
});

ruta.get('/', async (req, res, next) => {
	try {
		let resultado = await obtenerLugares();
		res.json(resultado).status(200);
	} catch (error) {
		next(error.message);
	}
});

module.exports = ruta;
