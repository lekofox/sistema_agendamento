import Sequelize, { Model } from 'sequelize';


class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey:true,
                type:Sequelize.INTEGER

            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
            {
                sequelize,
                underscored: true,
                tableName: 'users'
            })
            return this
    }
}

export default User;