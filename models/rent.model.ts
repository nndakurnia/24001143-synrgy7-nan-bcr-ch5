import { Model, ModelObject } from "objection";
import { UserModel } from "./user.model";

export class RentModel extends Model {
  id!: number;
  user_id!: number;
  car_id!: number;
  start_date!: Date;
  end_date!: Date;
  status!: 'pending' | 'confirmed' | 'finished' | 'cancelled';
  rental_cost!: number;
  payment_status!: boolean;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'rent';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "rent.user_id",
          to: "users.id"
        }
      },
      cars: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "rent.car_id",
          to: "cars.id"
        }
      }
    }
  }
}

export type Rent = ModelObject<RentModel>;