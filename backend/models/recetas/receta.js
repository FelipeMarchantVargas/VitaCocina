const mongoose = require('mongoose');

const ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    discreto: {
        type: Boolean,
        required: true
    }
  });
  

const RecetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    ingredientes: {
        type: [ingredienteSchema],
        required: true
    },
    nutricion: {
        type: String,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    instrucciones: {
        type: String,
        required: true
    },
    consejos: {
        type: String,
        required: true
    },
});


const Receta = mongoose.model('Receta', RecetaSchema);

module.exports = { Receta };
