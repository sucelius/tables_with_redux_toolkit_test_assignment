import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const userGetController = async (req: Request, res: Response) => {
  try {
    await client.$connect();
    const users = await client.user.findMany();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const userCreateController = async (req: Request, res: Response) => {
  const { name, educationName } = req.body;
  if (!name || !educationName) {
    res.status(400).send('Missing required data');
    return;
  }
  try {
    await client.$connect();
    const newUser = await client.user.create({
      data: {
        name: name,
        educationName: educationName,
      },
    });
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    await client.$disconnect();
  }
};

export const userDeleteController = async (req: Request, res: Response) => {
  const userId: number = Number(req.body);
  try {
    await client.$connect();
    const delUser = await client.user.delete({
      where: {
        id: userId,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const userUpdateController = async (req: Request, res: Response) => {
  const { id, name, educationName } = req.body;
  try {
    await client.$connect();
    const updateUser = await client.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        educationName: educationName,
      },
    });

    res.send(updateUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
