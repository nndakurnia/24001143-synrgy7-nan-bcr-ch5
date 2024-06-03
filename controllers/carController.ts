import { Request, Response, NextFunction } from "express";
import { CarModel } from "../models/car.model";
const cloudinary = require("../middlewares/cloudinary")

const getCars = async (req: Request, res: Response) => {
  const carNameQuery = req.query.name as string;
  const carTypeQuery = req.query.type as string;

  try {
    // query untuk menampilkan data berdasarkan query 'name' atau 'type'
    if (carNameQuery || carTypeQuery) {
      const filteredData = await CarModel.query()
        // modify(): metode dari Objection.js untuk memodifikasi query secara dinamis
        .modify((queryBuilder) => {
          if (carNameQuery) {
            queryBuilder.whereRaw('LOWER(name) LIKE ?', [`%${carNameQuery.toLowerCase()}%`]);
          }
          if (carTypeQuery) {
            queryBuilder.orWhereRaw('LOWER(type) LIKE ?', [`%${carTypeQuery.toLowerCase()}%`]);
          }
        });

      if (filteredData.length === 0) {
        return res.status(404).json({ message: 'Data not found' });
      } else {
        res.status(200).json({ message: 'Success', data: filteredData });
      }
    } else {
      // query untuk mengambil semua data
      const data = await CarModel.query();
      res.status(200).json({ message: 'Success', data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const addCar = async (req: Request, res: Response) => {
  const { plate, name, rent_cost, capacity, description, transmission, type, year, available_at, is_available } = req.body;

  try {
    // validasi input notNullable()
    if (!plate || !name || !rent_cost || !capacity || !type) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Ambil file gambar dari req.file
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const fileBase64 = req.file.buffer.toString('base64');
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    // Upload gambar ke Cloudinary
    cloudinary.uploader.upload(file, async (err: Error, result: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Image upload failed' });
      }

      // Buat entri baru di database
      const newCar: CarModel = await CarModel.query().insert({
        plate,
        name,
        image: result.url, // URL gambar dari cloudinary
        rent_cost,
        capacity,
        description,
        transmission,
        type,
        year,
        available_at: available_at || new Date(),
        is_available: is_available || true,
        created_at: new Date(),
        updated_at: new Date()
      });

      res.status(201).json({ message: 'Car added successfully', data: newCar });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const updateCar = async (req: Request, res: Response) => {
  const { carId } = req.params;
  const { plate, name, rent_cost, capacity, description, transmission, type, year, available_at, is_available } = req.body;

  try {
    const existingCar = await CarModel.query().findById(carId);
    if (!existingCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const updatedCarData: any = {
      plate: plate || existingCar.plate,
      name: name || existingCar.name,
      rent_cost: rent_cost || existingCar.rent_cost,
      capacity: capacity || existingCar.capacity,
      description: description || existingCar.description,
      transmission: transmission || existingCar.transmission,
      type: type || existingCar.type,
      year: year || existingCar.year,
      available_at: available_at || existingCar.available_at,
      is_available: is_available !== undefined ? is_available : existingCar.is_available,
      updated_at: new Date()
    };

    let newImageUrl = existingCar.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      newImageUrl = result.url;
    }

    // update URL gambar di objek data mobil yang diupdate
    updatedCarData.image = newImageUrl;

    await CarModel.query().findById(carId).patch(updatedCarData);

    res.status(200).json({ message: 'Car updated successfully', data: updatedCarData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  const id = +req.params.id;

  try {
    const existingCar = await CarModel.query().findById(id);
    if (!existingCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await CarModel.query().deleteById(id);

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getCars, addCar, updateCar, deleteCar }