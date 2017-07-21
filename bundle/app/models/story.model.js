"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../core");
var Sequelize = require("sequelize");
function factory() {
    var database = core_1.IOC.Container.get(core_1.Database);
    var client = database.client();
    var StoryModel = client.define('stories', {
        author_id: {
            type: Sequelize.BIGINT
        },
        lat: {
            type: Sequelize.STRING
        },
        lng: {
            type: Sequelize.STRING
        },
        cuisine: {
            type: Sequelize.STRING
        },
        summary: {
            type: Sequelize.STRING
        },
        image_key: {
            type: Sequelize.STRING
        },
        story: {
            type: Sequelize.STRING
        }
    });
    return StoryModel;
}
exports.StoryModelFactory = factory;
//# sourceMappingURL=story.model.js.map