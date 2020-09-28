const express = require('express');
const app = express();
const mongo = require('mongoose');
const lugares = require('./rutas/lugares');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/lugares', lugares);
app.use('/lugares', lugares);

app.use((err, req, res, next) => {
	if (err) {
		res.status(400).json(err);
	}
});

app.listen(3100, async () => {
	await mongo.connect('mongodb://localhost:27017/lugares', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('base de datos y servidor listos!!');
});
