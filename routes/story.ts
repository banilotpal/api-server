import { IOC, Types } from '../core';
import { StoryController } from '../app/controllers/story-controller';

let storyController: StoryController = IOC.Container.get(StoryController);

export let createStory: Types.HttpRoute = {
    method: 'POST',
    path: '/story',
    name: 'create story',
    handler: storyController.create,
    protected: true
};

export let listStories: Types.HttpRoute = {
    method: 'GET',
    path: '/story',
    name: 'list story',
    handler: storyController.list,
    protected: true
};