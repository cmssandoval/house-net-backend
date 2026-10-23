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

// Validate admin role to use this routes
// inventoryRouter.get('/categories', inventoryController.readCategories);
// inventoryRouter.post('/categories', inventoryController.writeCategories);
// inventoryRouter.put('/categories/:id', inventoryController.replaceCategory);
// inventoryRouter.patch('/categories/:id', inventoryController.modifyCategory);
// inventoryRouter.get('/categories/:id', inventoryController.readCategoryById);
// inventoryRouter.delete('/categories/:id', inventoryController.deleteCategory);

// inventoryRouter.get('/locations', inventoryController.readLocation);
// inventoryRouter.post('/locations', inventoryController.writeLocation);
// inventoryRouter.put('/locations/:id', inventoryController.replaceLocation);
// inventoryRouter.patch('/locations/:id', inventoryController.modifyLocation);
// inventoryRouter.get('/locations/:id', inventoryController.readLocationById);
// inventoryRouter.delete('/locations/:id', inventoryController.deleteLocation);

export default inventoryRouter;
