import databaseConfig from '../config/database';
import Sequelize from 'sequelize';
import User from '../app/models/User';


const models = [User];

class Database{
    constructor(){
        this.init() 

    }

    init(){
        this.connection = new Sequelize(databaseConfig)
        models.forEach(model => model.init(this.connection))
    }
}

export default new Database();