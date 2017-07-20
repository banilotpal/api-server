// 20170719182909910_location.ts

import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';

const tableName: string = '';

module.exports = {
    up: function(query: QueryInterface, DataTypes) {
        return query.createTable('location', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            stall_name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            lat: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: 'LOCAL'
            },
            lon: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: 'LOCAL'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });
    },

    down: function(query: QueryInterface, DataTypes) {
        return query.dropTable('location');
    }
};
