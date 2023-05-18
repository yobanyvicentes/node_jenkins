const { request, response} = require('express');

const Proyecto = require('../models/proyecto');

//listar todos
const getProyectos = async (req = request, res = response) => {
    try {
        const proyectos = await Proyecto.find();
        res.status(200).send(proyectos).json();
    } catch (e) {
        return res.status(500).json({
            msg: 'Error el procesar la solicitud: ' + e
        })
    }
}

// crear
const postProyecto = async (req = request, res = response) => {
    try{
        //extraer las llaves foraneas
        const data = req.body
        console.log(data);

        //verificar que aun no exista el número de proyecto que se intenta crear
        const proyectoExiste = await Proyecto.findOne({ numero: req.body.numero });
        if (proyectoExiste) {
            return res.status(400).send(`el proyecto con número ${proyectoExiste} ya existe en el sistema, pruebe con otro número`);
        };

        const proyecto = new Proyecto(data);

        await proyecto.save();

        return res.status(201).json(proyecto);
    }catch(e){
        return res.status(500).json({
            msg: 'Error general' + e
        });
    };
};

// actualizar
const putProyecto = async (req = request, res = response) => {
    try {
        // verificar que el proyecto a editar no sea inexistente en el sistema
        let proyecto = await Proyecto.findById(req.params.idProyecto);
        if (!proyecto) {
            console.log(`proyecto existente: ${proyecto}`)
            return res.status(400).send(`el proyecto con id: ${proyecto._id}, no existe en el sistema, verifique el id`)
        };
        // verificar que si se edito el número del proyecto, no sea un número que ya este asignado a un proyecto distinto
        const numeroExistente = await Proyecto.findOne({ numero: req.body.numero, _id: { $ne: proyecto._id } });
        if (numeroExistente) {
            console.log(`numero existente: ${numeroExistente}`)
            return res.status(400).send(`el número ${req.body.numero} ya existe en el sistema, pruebe con otro número`)
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.tipoProyecto = req.body.tipoProyecto;
        proyecto.etapaProyecto = req.body.etapaProyecto;
        proyecto.cliente = req.body.cliente;
        proyecto.universidad = req.body.universidad;
        proyecto.fechaActualizacion = new Date;

        proyecto = await proyecto.save();

        res.status(200).send(proyecto).json();

    }catch(e){
        console.log(e);
        return res.status(500).json({
            msg: 'Error al actualizar' + e
        });
    };
}

module.exports = { postProyecto, getProyectos, putProyecto};