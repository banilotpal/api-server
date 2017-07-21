"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableName = '';
module.exports = {
    up: function (query, DataTypes) {
        query.addColumn('stories', 'image_key', {
            type: DataTypes.TEXT
        });
    },
    down: function (query, DataTypes) {
        query.removeColumn('stories', 'image_key');
    }
};
//# sourceMappingURL=20170721174130262_add_image_key_to_stories.js.map