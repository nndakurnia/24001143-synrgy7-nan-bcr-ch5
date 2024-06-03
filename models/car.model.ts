import { Model, ModelObject } from "objection";
import { RentModel } from "./rent.model";

export class CarModel extends Model {
  id!: number;
  plate!: string;
  name!: string;
  image!: string;
  rent_cost!: number;
  capacity!: number;
  description!: string;
  transmission!: string;
  type!: string;
  year!: number;
  available_at!: Date;
  is_available!: boolean;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'cars';
  }

  static get relationMappings() {
    return {
      rent: {
        relation: Model.HasManyRelation,
        modelClass: RentModel,
        join: {
          from: "cars.id",
          to: "rent.car_id"
        }
      }
    }
  }
}

export type Car = ModelObject<CarModel>;