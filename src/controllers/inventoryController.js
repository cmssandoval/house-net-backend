import InventoryModel from '../models/InventoryModel.js';

/** @type {import('express').RequestHandler} */
const readInventory = async ( req, res ) => {
    const inventory = await InventoryModel.getItems();
    return res.json(inventory);
};

/** @type {import('express').RequestHandler} */
const writeInventory = async ( req, res ) => {
    const item = req.body;
    const response = await InventoryModel.createItem({ item });
    return res.json({response});
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
    const { id } = req.params;
    const response = await InventoryModel.deleteItem( id );
    return res.json();
};


/** @type {import('express').RequestHandler} */
const readCategories = async ( req, res ) => {
    const categories = await InventoryModel.getCategories();
    return res.status(200).json(categories);
};

/** @type {import('express').RequestHandler} */
const writeCategories = async ( req, res ) => {
    const { tableData } = req.body;
    const response = await InventoryModel.createCategory( tableData );
    return res.status(201).json(response);
};

/** @type {import('express').RequestHandler} */
const deleteCategory = async ( req, res ) => {
    const { name } = req.params;
    const response = await InventoryModel.deleteCategory( name );
    return res.status(200).json(response);
};

/** @type {import('express').RequestHandler} */
const readLocations = async ( req, res ) => {
    const locations = await InventoryModel.getLocations();
    return res.status(200).json(locations);
};

/** @type {import('express').RequestHandler} */
const writeLocations = async ( req, res ) => {
    const { tableData } = req.body;
    const response = await InventoryModel.createLocation(tableData);
    return res.status(201).json(response);
};

/** @type {import('express').RequestHandler} */
const deleteLocation = async ( req, res ) => {
    const { name } = req.params;
    const response = await InventoryModel.deleteLocation( name );
    return res.status(200).json(response);
};

const inventoryController = {
    readInventory,
    writeInventory,
    replaceInventoryItem,
    modifyInventoryItem,
    deleteInventoryItem,

    readCategories,
    writeCategories,
    deleteCategory,
    readLocations,
    writeLocations,
    deleteLocation,
};

export default inventoryController;
