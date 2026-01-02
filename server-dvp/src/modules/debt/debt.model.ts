import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

export class Debt extends Model {
  declare id_debt: number
  declare amount: number
  declare description: string
  declare created_at: string
  declare paid_at?: string
  declare user_id: number
}

Debt.init({
    id_debt: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paid_at: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},
{
    sequelize,
    tableName: 'debt',
    timestamps: false,
})