import InventoryModel from '../models/InventoryModel.js';

/** @type {import('express').RequestHandler} */
const readInventory = async ( req, res ) => {
    const inventory = await InventoryModel.getItems();
    return res.json(inventory);
};

/** @type {import('express').RequestHandler} */
const writeInventory = async ( req, res ) => {
    const response = await InventoryModel.createItem();
    return res.json();
};

/** @type {import('express').RequestHandler} */
const replaceInventoryItem = async ( req, res ) => {
    const response = await InventoryModel.replaceItem();
    return res.json();
};

/** @type {import('express').RequestHandler} */
const modifyInventoryItem = async ( req, res ) => {
    const response = await InventoryModel.modifyItem();
    return res.json();
};

/** @type {import('express').RequestHandler} */
const deleteInventoryItem = async ( req, res ) => {
    const response = await InventoryModel.deleteItem();
    return res.json();
};

const inventoryController = {
    readInventory,
    writeInventory,
    replaceInventoryItem,
    modifyInventoryItem,
    deleteInventoryItem,
};

export default inventoryController;
