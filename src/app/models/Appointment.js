import Sequelize, { Model } from 'sequelize';
import User from '../models/User'


class Appointment extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey:true,
                type:Sequelize.INTEGER,
                autoIncrement: true

            },
            canceled_at: Sequelize.DATE,
            date: Sequelize.DATE
        },
            {
                sequelize,
                underscored: true,
                tableName: 'appointments'
            })

           

            return this
            
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
        this.belongsTo(models.User, { foreignKey: 'collaborator_id', as: 'collaborator'})
    }
}

export default Appointment;