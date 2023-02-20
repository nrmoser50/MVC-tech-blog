const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const brcrypt = require('brcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return brcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            async breaforeCreate(newUserData) {
                newUserData.password = await brcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await brcrypt.hash(
                    updatedUserData.password,
                    10
                );
                return updatedUserData;
            },
        },
        sequelize,
        timpestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

model.exports = User;