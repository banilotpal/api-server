import * as Bunyan from 'bunyan';
import { Types, IOC, LogProvider, Decorators } from '../../core';

@Decorators.autobind
export class HomeController {
    private log: Bunyan;
    constructor (@IOC.Inject logProvider: LogProvider) {
        // this.log = logProvider.factory();
    }
    show (req, res, next) {
        res.send(200, 'Hello world!!!');
        next();
    }
}