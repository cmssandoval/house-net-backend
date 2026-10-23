import prisma from '../database/prisma.js';

const cleanUpHash = ( user ) => {
  if ( !user ) return null;
  const { passwordHash, ...cleanUser } = user;
  return cleanUser;
};

class UserModel {

  static async create({ email, fullName, passwordHash }) {
    try {
      const newUser = await prisma.user.create({
        data: {
          email, fullName, passwordHash,
          displayName: fullName,
          role: 'user',
          isActive: true,
        }
      });
      return cleanUpHash(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const users = await prisma.user.findMany();
      return users.map(cleanUpHash);
    } catch (error) {
      throw error;
    }
  }

  static async findById( id ) {
    try {
      return cleanUpHash(await prisma.user.findUnique({ where: { id } }));
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail( email ) {
    try {
      return cleanUpHash(await prisma.user.findUnique({ where: { email } }));
    } catch (error) {
      throw error;
    }
  }
  
  static async findByEmailWithHash( email ) {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  static async update({ id, updateData }) {
    try {
      return cleanUpHash(await prisma.user.update({ where: { id }, data: updateData }));
    } catch (error) {
      throw error;
    }
  }

  static async delete( id ) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

}

export default UserModel;