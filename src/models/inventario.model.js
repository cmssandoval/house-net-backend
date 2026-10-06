import { pool } from '../database/connection.js';

const getItems = async () => {
    const query = 'SELECT * FROM inventario';
    const result = await pool.query(query);
    return result.rows;
};

const createItem = async ( item ) => {
    
};

const replaceItem = async ({ id, item }) => {
    
};

const modifyItem = async ({ id, data }) => {
    
};

const deleteItem = async ( id ) => {
    
};

const inventarioModel = {
    getItems,
    createItem,
    replaceItem,
    modifyItem,
    deleteItem,
};

export default inventarioModel;