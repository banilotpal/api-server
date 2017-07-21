"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var story_controller_1 = require("../app/controllers/story-controller");
var storyController = core_1.IOC.Container.get(story_controller_1.StoryController);
exports.createStory = {
    method: 'POST',
    path: '/story',
    name: 'create story',
    handler: storyController.create,
    protected: true
};
exports.deleteStory = {
    method: 'DELETE',
    path: '/story',
    name: 'delete story',
    handler: storyController.delete,
    protected: true
};
exports.userStories = {
    method: 'GET',
    path: '/story',
    name: 'list story',
    handler: storyController.list,
    protected: true
};
exports.locationBasedStories = {
    method: 'GET',
    path: '/localisedStories',
    name: 'list location based stories',
    handler: storyController.locationBasedStories,
    protected: false
};
//# sourceMappingURL=story.js.map