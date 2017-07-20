import { Database, IOC } from '../../core';
import * as Sequelize from 'sequelize';

function factory () {
    const database: Database = IOC.Container.get(Database);
    const client = database.client();

    let StoryModel = client.define('stories', {
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
        story: {
            type: Sequelize.STRING
        }
    });

    return StoryModel;
}

export {
    factory as StoryModelFactory
};