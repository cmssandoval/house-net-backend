// import { pool } from '../database/nodePg.js';
import prisma from '../database/prisma.js'

class InventoryModel {

  static async getItems() {
    return prisma.inventory.findMany({
      include: {
        category: true,
        location: true,
      }
    });
  }

  static async createItem({ item }) {
    const { productName, stock, unit } = item;

    const category = await prisma.category.findUnique({
      where: { name: item.category },
    });

    const location = await prisma.location.findUnique({
      where: { name: item.location },
    });

    if ( !category || !location ) {
      throw new Error('Categoría o ubicación inexistente');
    }

    return prisma.inventory.create({
      data: {
        productName,
        imageUrl: null,
        category: {
          connect: { id: category.id },
        },
        location: {
          connect: { id: location.id },
        },
        stock,
        minStock: 0,
        unit,
        notes: null,
      },
      include: {
        category: true,
        location: true,
      }
    });
  }

  static async replaceItem({ id, item }) {

  }

  static async modifyItem({ id, data }) {

  }

  static async deleteItem(id) {

  }
}

export default InventoryModel;