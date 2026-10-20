// import { pool } from '../database/connection.js';
import prisma from '../database/prisma.js'

class InventoryModel {

    static async getItems () {
        return prisma.inventory.findMany({
            include: {
                category: true,
                location: true,
            }
        });
    }

    static async createItem (item) {
        const {
            productName,
            imageUrl = null,
            categoryName,
            locationName,
            stock = 0,
            minStock = 0,
            unit = 'unidad',
            notes = null,
        } = item;

        return prisma.inventory.create({
            data: {
                productName,
                imageUrl,
                category: {
                    connect: { name: categoryName },
                },
                location: {
                    connect: { name: locationName },
                },
                stock,
                minStock,
                unit,
                notes,
            },
            include: {
                category: true,
                location: true,
            }
        });
    }

    static async replaceItem ({ id, item }) {

    }

    static async modifyItem ({ id, data }) {

    }

    static async deleteItem (id) {

    }
}

export default InventoryModel;