import { Request, Response } from "express";
import { CarModel } from "../../models/car.model";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../middlewares/cloudinary";

const carServices = {
  getCars: async (req: Request, res: Response) => {
    const carName = req.query.name as string;
    const carType = req.query.type as string;

    try {
      // query untuk menampilkan data berdasarkan query 'name' atau 'type' dan keduanya
      if (carName || carType) {
        const filteredData = await CarModel.query()
          // modify(): metode dari Objection.js untuk memodifikasi query secara dinamis
          .modify((queryBuilder) => {
            if (carName) {
              queryBuilder.whereRaw('LOWER(name) LIKE ?', [`%${carName.toLowerCase()}%`]);
            }
            if (carType) {
              queryBuilder.andWhereRaw('LOWER(type) LIKE ?', [`%${carType.toLowerCase()}%`]);
            }
          });

        if (filteredData.length === 0) {
          return res.status(404).json({ message: 'Car not found!' });
        } else {
          res.status(200).json({ message: 'Success', filteredData });
        }
      } else {
        // query untuk mengambil semua data
        const data = await CarModel.query();

        res.status(200).json({ message: 'Success', data });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  getCarById: async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const findData = await CarModel.query().findById(id)

      if (findData) {
        res.status(200).json({ message: 'Success', findData });
      } else {
        return res.status(404).json({ message: 'Car not found!' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  addCar: async (req: Request, res: Response) => {
    const payload = req.body;

    try {
      // validasi input notNullable()
      if (!payload.plate || !payload.name || !payload.rent_cost || !payload.capacity || !payload.type) {
        return res.status(400).json({ message: 'Required fields are missing!' });
      }

      // plate harus unik
      const existingCar = await CarModel.query().findOne({ plate: payload.plate });
      if (existingCar) {
        return res.status(400).json({ message: 'Car with this plate already exists!' });
      }

      const car = await CarModel.query()
      const id = car.length + 1

      const newCar: any = {
        id: id,
        plate: payload.plate,
        name: payload.name,
        rent_cost: payload.rent_cost,
        capacity: payload.capacity,
        description: payload.description || "",
        transmission: payload.transmission || "",
        type: payload.type,
        year: payload.year || null,
        available_at: payload.available_at || new Date(),
        is_available: payload.is_available || true,
        created_at: new Date(),
        updated_at: new Date()
      };

      // jika ada upload file image
      if (req.file) {
        // convert  file to base64 format
        const fileBase64 = req.file.buffer.toString('base64');
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        // upload image to Cloudinary
        await cloudinary.uploader.upload(file, async (err: Error, result: UploadApiResponse) => {
          if (err) {
            return res.status(500).json({ message: 'Image upload failed!' });
          } else {
            newCar.image = result.url;

            await CarModel.query().insert(newCar);

            res.status(201).json({ message: 'Car added successfully!', data: newCar });
          }
        });
      } else {
        // kalo ga masukin gambar, pake gambar default
        newCar.image = "https://res.cloudinary.com/dpif60wfq/image/upload/v1717425959/uz7l4onwpaaftklhd4mv.jpg";

        await CarModel.query().insert(newCar);

        res.status(201).json({ message: 'Car added successfully!', data: newCar });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  updateCar: async (req: Request, res: Response) => {
    const id = +req.params.id;
    const payload = req.body;

    try {
      const existingCar = await CarModel.query().findById(id);
      if (!existingCar) {
        return res.status(404).json({ message: 'Car not found!' });
      }

      const updatedCarData: any = {
        id: id,
        plate: payload.plate || existingCar.plate,
        name: payload.name || existingCar.name,
        rent_cost: payload.rent_cost || existingCar.rent_cost,
        capacity: payload.capacity || existingCar.capacity,
        description: payload.description || existingCar.description,
        transmission: payload.transmission || existingCar.transmission,
        type: payload.type || existingCar.type,
        year: payload.year || existingCar.year,
        available_at: payload.available_at || existingCar.available_at,
        is_available: payload.is_available !== undefined ? payload.is_available : existingCar.is_available,
        created_at: existingCar.created_at,
        updated_at: new Date()
      };

      // kalo ada file baru yg diupload
      if (req.file) {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        await cloudinary.uploader.upload(file, async (err: Error, result: UploadApiResponse) => {
          if (err) {
            return res.status(500).json({ message: 'Image upload failed!' });
          } else {
            updatedCarData.image = result.url;

            await CarModel.query().findById(id).patch(updatedCarData);

            res.status(200).json({ message: 'Car updated successfully!', data: updatedCarData });
          }
        });
      } else {
        updatedCarData.image = existingCar.image

        await CarModel.query().findById(id).patch(updatedCarData);

        res.status(200).json({ message: 'Car updated successfully!', data: updatedCarData });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  },

  deleteCar: async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const existingCar = await CarModel.query().findById(id);
      if (!existingCar) {
        return res.status(404).json({ message: 'Car not found!' });
      }

      await CarModel.query().deleteById(id);

      res.status(200).json({ message: 'Car deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
}

export default carServices;
