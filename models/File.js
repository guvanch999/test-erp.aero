"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        static associate() {
        }
    }

    File.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            extension: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mime_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: "files",
            modelName: "File",
        }
    );
    return File;
};