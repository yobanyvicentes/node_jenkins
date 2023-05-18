const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Numero requerido'],
        unique: [true, 'Debe ser único']
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido']
    },
    fechaIniciacion: {
        type: Date,
        required: [true, 'la fecha de inicio es obligatoria']
    },
    fechaEntrega: {
        type: Date,
        required: [true, 'la fecha de entrega es obligatoria']
    },
    valor : {
        type : Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    tipoProyecto: {
        type: String,
        required: [true,'obligatorio: (ensayo, artículo, monografía, trabajo final de pregrado o trabajo final de especialización)'],
        enum: ['ensayo', 'artículo', 'monografía', 'trabajo final de pregrado', 'trabajo final de especialización']
    },
    cliente: {
        type: String,
        required: true
    },
    universidad: {
        type: String,
        required: true
    },
    etapaProyecto: {
        type: String,
        required: [true,'obligatorio: anteproyecto, entrega parcial 1, entrega parcial 2, y entrega final'],
        enum: ['anteproyecto', 'entrega parcial 1', 'entrega parcial 2', 'entrega final']
    }
});

module.exports = model('Proyecto', ProyectoSchema)
