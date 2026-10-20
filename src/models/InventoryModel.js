// import { pool } from '../database/nodePg.js';
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

    static async createItem ( item ) {
        const {
            productName,
            imageUrl = null,
            categoryId,
            locationId,
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
                    connect: { id: categoryId },
                },
                location: {
                    connect: { id: locationId },
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