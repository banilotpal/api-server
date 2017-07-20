"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableName = '';
module.exports = {
    up: function (query, DataTypes) {
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
    down: function (query, DataTypes) {
        return query.dropTable('location');
    }
};
//# sourceMappingURL=20170719182909910_location.js.map