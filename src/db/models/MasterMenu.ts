import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db_connection";
import Submenu from "./Submenu";

interface MasterMenuAttributes {
  id?: number;
  name?: string | null;
  icon?: string | null;
  ordering?: number | null;
  active?: boolean | null;

  createAt?: Date;
  updateAt?: Date;
}

export interface MasterMenuInput extends Optional<MasterMenuAttributes, "id"> {}
export interface MasterMenuOutput extends Required<MasterMenuAttributes> {}

class MasterMenu
  extends Model<MasterMenuAttributes, MasterMenuInput>
  implements MasterMenuAttributes
{
  public id!: number;
  public name!: string;
  public icon!: string;
  public ordering!: number;
  public active!: boolean;
  public createAt!: Date;
  public updateAt!: Date;
}

MasterMenu.init(
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
    icon: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    ordering: {
      allowNull: true,
      type: DataTypes.INTEGER,
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

MasterMenu.hasMany(Submenu);

export default MasterMenu;
