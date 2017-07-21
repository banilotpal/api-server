import * as Bunyan from 'bunyan';
import axios from 'axios';
import * as _ from 'lodash';
import { Types, IOC, LogProvider, Decorators } from '../../core';
import { StoryModelFactory } from '../models/story.model';

@Decorators.autobind
export class StoryController {
    private log: Bunyan;
    constructor( @IOC.Inject logProvider: LogProvider) {
        this.log = logProvider.factory();
    }

    list(req, res, next) {
        // tslint:disable-next-line:no-string-literal
        let authorId = req.user['user'];
        let StoryModel = StoryModelFactory();
        StoryModel.findAll({ where: { author_id: authorId } })
            .then((stories) => {
                res.send(200, stories);
            })
            .catch(err => console.log(err));
    }

    create(req, res, next) {
        // tslint:disable-next-line:no-string-literal
        let storyObject = req.body['story'];
        let { lat, lng, cuisine, summary, image_key, story } = storyObject;
        // tslint:disable-next-line:no-string-literal
        let authorId = req.user['user'];

        let StoryModel = StoryModelFactory();

        StoryModel.create({
            author_id: authorId,
            lat,
            lng,
            cuisine,
            summary,
            image_key,
            story
        }).then((newStory) => {
            res.send(200);
        }).catch(err => console.log(err));
    }

    delete (req, res, next) {
        // tslint:disable-next-line:no-string-literal
        let storyId = req.body['storyId'];
        // tslint:disable-next-line:no-string-literal
        let authorId = req.user['user'];

        console.log(storyId, authorId);

        let StoryModel = StoryModelFactory();
        StoryModel.destroy({
            where: {id: storyId}
        }).then((result) => {
            res.send(200);
        }).catch((err) => console.log(err));
    }

    locationBasedStories(req, res, next) {
        let StoryModel = StoryModelFactory();
        StoryModel.findAll()
            .then((stories) => {
                res.send(200, stories);
            })
            .catch((err) => console.log(err));
    }
}