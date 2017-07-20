import * as Bunyan from 'bunyan';
import { Types, IOC, LogProvider, Decorators } from '../../core';
import { StoryModelFactory } from '../models/story.model';

@Decorators.autobind
export class StoryController {
    private log: Bunyan;
    constructor (@IOC.Inject logProvider: LogProvider) {
        this.log = logProvider.factory();
    }

    list (req, res, next) {
        // tslint:disable-next-line:no-string-literal
        let authorId = req.user['user'];
        let StoryModel = StoryModelFactory();
        StoryModel.findAll({where: {author_id: authorId}})
            .then ((stories) => {
                res.send(200, stories);
            })
            .catch (err => console.log(err));
    }

    create (req, res, next) {
        // tslint:disable-next-line:no-string-literal
        let storyObject = req.body['story'];
        let { lat, lng, cuisine, summary, story } = storyObject;
        // tslint:disable-next-line:no-string-literal
        let authorId = req.user['user'];

        let StoryModel = StoryModelFactory();

        StoryModel.create({
            author_id: authorId,
            lat,
            lng,
            cuisine,
            summary,
            story
        }).then((newStory) => {
            res.send(200);
        }).catch(err => console.log(err));
    }
}