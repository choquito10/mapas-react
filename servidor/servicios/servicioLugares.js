const modeloCreado = require('../mongoDB/schema');

async function guardarDatos(body) {
	try {
		if (body.titulo !== undefined && body.comentario !== undefined) {
			const lugar = new modeloCreado(body);
			const respuesta = await lugar.save();
			return respuesta;
		}
		throw new Error('error en los datos enviados');
	} catch (error) {
		throw new Error(error.message);
	}
}

async function obtenerLugares() {
	try {
		const resultado = await modeloCreado.find({});
		return resultado;
	} catch (error) {
		throw new Error(error.message);
	}
}

module.exports = {
	guardarDatos,
	obtenerLugares,
};
