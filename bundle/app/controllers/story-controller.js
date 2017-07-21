"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../core");
var story_model_1 = require("../models/story.model");
var StoryController = (function () {
    function StoryController(logProvider) {
        this.log = logProvider.factory();
    }
    StoryController.prototype.list = function (req, res, next) {
        var authorId = req.user['user'];
        var StoryModel = story_model_1.StoryModelFactory();
        StoryModel.findAll({ where: { author_id: authorId } })
            .then(function (stories) {
            res.send(200, stories);
        })
            .catch(function (err) { return console.log(err); });
    };
    StoryController.prototype.create = function (req, res, next) {
        var storyObject = req.body['story'];
        var lat = storyObject.lat, lng = storyObject.lng, cuisine = storyObject.cuisine, summary = storyObject.summary, image_key = storyObject.image_key, story = storyObject.story;
        var authorId = req.user['user'];
        var StoryModel = story_model_1.StoryModelFactory();
        StoryModel.create({
            author_id: authorId,
            lat: lat,
            lng: lng,
            cuisine: cuisine,
            summary: summary,
            image_key: image_key,
            story: story
        }).then(function (newStory) {
            res.send(200);
        }).catch(function (err) { return console.log(err); });
    };
    StoryController.prototype.delete = function (req, res, next) {
        var storyId = req.body['storyId'];
        var authorId = req.user['user'];
        console.log(storyId, authorId);
        var StoryModel = story_model_1.StoryModelFactory();
        StoryModel.destroy({
            where: { id: storyId }
        }).then(function (result) {
            res.send(200);
        }).catch(function (err) { return console.log(err); });
    };
    StoryController.prototype.locationBasedStories = function (req, res, next) {
        var StoryModel = story_model_1.StoryModelFactory();
        StoryModel.findAll()
            .then(function (stories) {
            res.send(200, stories);
        })
            .catch(function (err) { return console.log(err); });
    };
    return StoryController;
}());
StoryController = __decorate([
    core_1.Decorators.autobind,
    __param(0, core_1.IOC.Inject),
    __metadata("design:paramtypes", [core_1.LogProvider])
], StoryController);
exports.StoryController = StoryController;
//# sourceMappingURL=story-controller.js.map