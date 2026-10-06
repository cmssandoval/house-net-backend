import inventarioModel from '../models/inventario.model.js'

const readInventario = async ( req, res ) => {
    const response = await inventarioModel.getItems();
    return res.json(response);
};

const writeInventario = async ( req, res ) => {
    const inventario = await inventarioModel.createItem();
    return res.json();
};

const replaceInventario = async ( req, res ) => {
    const inventario = await inventarioModel.replaceItem();
    return res.json();
};

const modifyInventario = async ( req, res ) => {
    const inventario = await inventarioModel.modifyItem();
    return res.json();
};

const deleteInventario = async ( req, res ) => {
    const inventario = await inventarioModel.deleteItem();
    return res.json();
};


const inventarioController = {
    readInventario,
    writeInventario,
    replaceInventario,
    modifyInventario,
    deleteInventario,
};

export default inventarioController;