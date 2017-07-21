// 20170721174130262_add_image_key_to_stories.ts

import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';

const tableName: string = '';

module.exports = {
    up: function(query: QueryInterface, DataTypes) {
        query.addColumn('stories', 'image_key', {
            type: DataTypes.TEXT
        });
    },

    down: function(query: QueryInterface, DataTypes) {
        query.removeColumn('stories', 'image_key');
    }
};
