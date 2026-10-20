import express from 'express';
import inventoryController from '../controllers/inventory.controller.js';

const inventoryRouter = express.Router();

inventoryRouter.get('/', inventoryController.readInventory);
inventoryRouter.post('/', inventoryController.writeInventory);
inventoryRouter.put('/:id', inventoryController.replaceInventoryItem);
inventoryRouter.patch('/:id', inventoryController.modifyInventoryItem);
inventoryRouter.delete('/:id', inventoryController.deleteInventoryItem);

export default inventoryRouter;
