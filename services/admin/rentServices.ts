import { Request, Response } from "express";
import { RentModel } from "../../models/rent.model";

const adminRentServices = {
  getAllRent: async (req: Request, res: Response) => {
    try {
      const data = await RentModel.query();

      res.status(200).json({ message: 'Success', data });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  getRentById: async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const findData = await RentModel.query().findById(id);

      if (findData) {
        res.status(200).json({ message: 'Success', findData });
      } else {
        return res.status(404).json({ message: 'Car not found!' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  updateRentalStatus: async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { status } = req.body;

    try {
      const rental = await RentModel.query().findById(id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found!' });
      }

      const updatedRental = await rental.$query().patchAndFetchById(id, { status });

      res.status(200).json({ message: 'Success', UpdatedData: updatedRental });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePaymentStatus: async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { payment_status } = req.body;

    try {
      const rental = await RentModel.query().findById(id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      const updatedRental = await rental.$query().patchAndFetchById(id, { payment_status });

      res.status(200).json({ message: 'Success', UpdatedData: updatedRental });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
}

export default adminRentServices;
