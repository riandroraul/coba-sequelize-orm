import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db_connection";

interface UserAttributes {
  id?: number;
  name?: string | null;
  email?: string | null;
  roleId?: number | null;
  password?: string | null;
  accessToken?: string | null;
  verified?: boolean | null;
  active?: boolean | null;

  createAt?: Date;
  updateAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public roleId!: number;
  public password!: string;
  public accessToken!: string;
  public verified!: boolean;
  public active!: boolean;

  public createAt!: Date;
  public updateAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    roleId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    password: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    accessToken: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default User;
