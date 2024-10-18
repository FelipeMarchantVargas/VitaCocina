const mongoose = require('mongoose');

//para despues crear el carrito de compras automatico
//pienso que es util guardar ingredientes con unidades, para hacer por ejemplo
//750 ml de leche + 250ml de leche en recetas distintas = 1000ml en el carrito de compras
//o si no, despues saldrian cosas inconsistentes como
//para comprar: medio kilo de harina, dos tazas de harina, 300g de harina (en una misma lista)
const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_measure: {
        type: String,
        required: true
    }
  });
  
//probablemente le faltan cosas
const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [ingredientSchema],
        required: true
    },
    nutrition: {
        type: String,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    tips: {
        type: String,
        required: true
    },
});


const Recipe = mongoose.model('Recipes', RecipeSchema);

module.exports = Recipe;
