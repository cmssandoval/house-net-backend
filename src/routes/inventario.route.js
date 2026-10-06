import express from 'express';
import inventarioController from '../controllers/inventario.controller.js';

const inventarioRouter = express.Router();

inventarioRouter.get('/', inventarioController.readInventario);             // Obtener
// inventarioRouter.post('/', inventarioController.writeInventario);        // Crear
// inventarioRouter.put('/:id', inventarioController.replaceInventario);    // Reemplazar
// inventarioRouter.patch('/:id', inventarioController.modifyInventario);   // Modificar
// inventarioRouter.delete('/:id', inventarioController.deleteInventario);  // Eliminar

export default inventarioRouter;