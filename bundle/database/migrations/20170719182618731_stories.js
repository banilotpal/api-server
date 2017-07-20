"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableName = '';
module.exports = {
    up: function (query, DataTypes) {
        return query.createTable('stories', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            author_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            lat: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            lng: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            cuisine: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            summary: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            story: {
                type: DataTypes.TEXT,
                allowNull: false
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
        return query.dropTable('stories');
    }
};
//# sourceMappingURL=20170719182618731_stories.js.map