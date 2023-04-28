import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();


export const educationGetController = async (req: Request, res: Response) => {
    try {
      await client.$connect();
      const educations = await client.education.findMany();
      res.send(educations);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

export const educationCreateController = async (req: Request, res: Response) => {
  const {id, name} = req.body
  try {
    await client.$connect();
    const newEducation = await client.education.create({
      data: {
        name: name,
      },
    });

    console.log(newEducation)
    res.send(newEducation);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const educationDeleteController = async (req: Request, res: Response) => {
  const id = req.body
  try {
    await client.$connect();
    const delEducation = await client.education.delete({
      where: {
        id:Number(id),
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export const educationUpdateController = async (req: Request, res: Response) => {
  const {id, name} = req.body
    try {
      // const client = new PrismaClient();
      await client.$connect();
      const updateEducation = await client.education.update({
        where: {
            id:id,
        },
        data: {
            name:name,
        }
      });
  
      res.send(updateEducation);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
