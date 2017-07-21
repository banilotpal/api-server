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

export let deleteStory: Types.HttpRoute = {
    method: 'DELETE',
    path: '/story',
    name: 'delete story',
    handler: storyController.delete,
    protected: true
};

export let userStories: Types.HttpRoute = {
    method: 'GET',
    path: '/story',
    name: 'list story',
    handler: storyController.list,
    protected: true
};

export let locationBasedStories: Types.HttpRoute = {
    method: 'GET',
    path: '/localisedStories',
    name: 'list location based stories',
    handler: storyController.locationBasedStories,
    protected: false
};