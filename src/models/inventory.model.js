import { pool } from '../database/connection.js';

class InventoryModel {

    static async getItems () {
        const query = 'SELECT * FROM inventory';
        const result = await pool.query(query);
        return result.rows;
    }

    static async createItem (item) {

    }

    static async replaceItem ({ id, item }) {

    }

    static async modifyItem ({ id, data }) {

    }

    static async deleteItem (id) {

    }
}

export default InventoryModel;