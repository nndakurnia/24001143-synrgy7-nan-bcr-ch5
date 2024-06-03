import { Model, ModelObject } from "objection";
import { RentModel } from "./rent.model";

export class UserModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  username!: string;
  password!: string;
  user_type!: 'admin' | 'customer';
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      rent: {
        relation: Model.HasManyRelation,
        modelClass: RentModel,
        join: {
          from: "users.id",
          to: "rent.user_id"
        }
      }
    }
  }
}

export type User = ModelObject<UserModel>;