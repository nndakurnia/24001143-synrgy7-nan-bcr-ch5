import { Request, Response } from "express";
import { RentModel } from "../../models/rent.model";
import { UserRequest } from '../../types/request';
import { CarModel } from "../../models/car.model";

const customerRentServices = {
  getAllRent: async (req: UserRequest, res: Response) => {
    const userId = +req.user?.id;

    try {
      const findData = await RentModel.query().where('user_id', userId);

      if (findData.length === 0) {
        res.status(404).json({ message: 'No data yet!' });
      } else {
        res.status(200).json({ message: 'Success', findData });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  getRentById: async (req: UserRequest, res: Response) => {
    const id = +req.params.id;
    const userId = +req.user?.id;

    try {
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const findData = await RentModel.query().findOne({ id: id, user_id: userId });

      if (findData) {
        res.status(200).json({ message: 'Success', findData });
      } else {
        return res.status(404).json({ message: 'Rental not found!' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  createRent: async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = +(req as UserRequest).user?.id;

    try {
      const rent = await RentModel.query();
      const id = rent.length + 1;

      const carId = +payload.car_id;
      const car = await CarModel.query().findById(carId);

      if (!car) {
        return res.status(404).json({ message: 'Car not found!' });
      }

      const carCost = car.rent_cost;
      // Menghitung waktu rental dalam satuan hari
      const startDate = new Date(payload.start_date);
      const endDate = new Date(payload.end_date);
      const rentTime = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      if (rentTime <= 0) {
        return res.status(404).json({ message: 'Invalid rental period' });
      }

      // Menghitung biaya rental
      const rentalCost = carCost * rentTime;

      const newRent: any = {
        id: id,
        user_id: userId,
        car_id: payload.car_id,
        start_date: payload.start_date,
        end_date: payload.end_date,
        status: 'pending',
        rental_cost: rentalCost,
        payment_status: false,
        created_at: new Date(),
        updated_at: new Date(),
      }

      await RentModel.query().insert(newRent)

      res.status(201).json({ message: 'Rent added successfully!', data: newRent });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },
}

export default customerRentServices;
