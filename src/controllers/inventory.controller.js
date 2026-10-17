import InventoryModel from '../models/inventory.model.js';

const readInventory = async ( req, res ) => {
    const inventory = await InventoryModel.getItems();
    return res.json(inventory);
};

const writeInventory = async ( req, res ) => {
    const inventory = await InventoryModel.createItem();
    return res.json();
};

const replaceInventory = async ( req, res ) => {
    const inventory = await InventoryModel.replaceItem();
    return res.json();
};

const modifyInventory = async ( req, res ) => {
    const inventory = await InventoryModel.modifyItem();
    return res.json();
};

const deleteInventory = async ( req, res ) => {
    const inventory = await InventoryModel.deleteItem();
    return res.json();
};


const inventoryController = {
    readInventory,
    writeInventory,
    replaceInventory,
    modifyInventory,
    deleteInventory,
};

export default inventoryController;