const { Router } = require('express')
const { getProyectos, postProyecto, putProyecto } = require('../controllers/proyecto')

const router = Router()

// consultar todos
router.get('/', getProyectos);

// crear
router.post('/', postProyecto);

// actualizar
router.put('/:idProyecto', putProyecto);

module.exports = router;