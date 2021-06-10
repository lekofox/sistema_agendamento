import Sequelize, { Model } from 'sequelize';



class File extends Model {
    static init(sequelize) {
        super.init({
            id: {
                primaryKey:true,
                type:Sequelize.INTEGER,
                autoIncrement: true

            },
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3333/files/${this.path}`
                }
            }
        },
            {
                sequelize,
                underscored: true,
                tableName: 'files'
            })

           

            return this
            
    }
    
}

export default File;