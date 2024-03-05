"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate() {
        }
    }

    Users.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: "users",
            modelName: "Users",
        }
    );
    return Users;
};