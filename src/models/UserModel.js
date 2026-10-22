import prisma from '../database/prisma.js';

class UserModel {

  static async create( userData ) {
    const newUser = await prisma.user.create({ data: { userData } });
    const { passwordHash: _, ...cleanUser } = newUser;
    return { user: cleanUser };
  }

  static async findAll() {
    const users = await prisma.user.findMany();
    return users.map(({ passwordHash, ...cleanUser }) => cleanUser);
  }

  static async findById( id ) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user.map(({ passwordHash, ...cleanUser }) => cleanUser);
  }

  static async findByEmail( email ) {
    const user =  await prisma.user.findUnique({ where: { email } });
    return user.map(({ passwordHash, ...cleanUser }) => cleanUser);
  }

  static async update({ id, updateData }) {
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  static async delete( id ) {
    return await prisma.user.delete({ where: { id } });
  }

}

export default UserModel;