const mongo = require('mongoose');
const { Schema } = mongo;

const lugares = new Schema({
	titulo: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20,
	},
	comentario: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 200,
	},
	fecha: {
		type: Date,
		default: Date.now,
	},
	coordenadas: {
		type: [Number],
		required: true,
	},
});

const modelo = mongo.model('lugares', lugares);

module.exports = modelo;
