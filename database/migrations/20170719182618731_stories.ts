// 20170719182618731_stories.ts

import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';

const tableName: string = '';

module.exports = {
    up: function(query: QueryInterface, DataTypes) {
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
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            summary: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            body: {
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

    down: function(query: QueryInterface, DataTypes) {
        return query.dropTable('stories');
    }
};
