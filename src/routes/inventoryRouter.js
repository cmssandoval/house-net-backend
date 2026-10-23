import express from 'express';
import inventoryController from '../controllers/inventoryController.js';
import validateSchema from "../middlewares/validateSchema.js";
import { createProductSchema } from '../schemas/inventorySchemas.js';

const inventoryRouter = express.Router();

inventoryRouter.get('/', inventoryController.readInventory);
inventoryRouter.post('/', validateSchema(createProductSchema), inventoryController.writeInventory);
inventoryRouter.put('/:id', inventoryController.replaceInventoryItem);
inventoryRouter.patch('/:id', inventoryController.modifyInventoryItem);
inventoryRouter.delete('/:id', inventoryController.deleteInventoryItem);

export default inventoryRouter;
