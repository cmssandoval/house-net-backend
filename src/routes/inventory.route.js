import express from 'express';
import inventoryController from '../controllers/inventory.controller.js';

const inventoryRouter = express.Router();

inventoryRouter.get('/', inventoryController.readInventory);                // Obtener
// inventarioRouter.post('/', inventarioController.writeInventario);        // Crear
// inventarioRouter.put('/:id', inventarioController.replaceInventario);    // Reemplazar
// inventarioRouter.patch('/:id', inventarioController.modifyInventario);   // Modificar
// inventarioRouter.delete('/:id', inventarioController.deleteInventario);  // Eliminar

export default inventoryRouter;
