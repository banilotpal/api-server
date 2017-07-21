import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
/**
 * Loads environment variables from .env located at given root
 * @param ROOT_PATH Project root
 */
export function loadEnvironment (ROOT_PATH: string) {
    const ENV_TYPE = process.env.NODE_ENV || '';
    let ENV_FILE = path.join(ROOT_PATH, (ENV_TYPE ? '.env.' + ENV_TYPE : '.env'));

    /**
     * Search for the env file one level up if it is was not found in the
     * ROOT PATH. When trasnpiling typescript it is a common practice to
     * place js files in a bundle.
     */
    if (fs.existsSync(ENV_FILE) === false) {
        ENV_FILE = path.join(ROOT_PATH, '..', (ENV_TYPE ? '.env.' + ENV_TYPE : '.env'));
    }

    if (fs.existsSync(ENV_FILE)) {
        let envVars = fs.readFileSync(ENV_FILE, 'utf-8').split('\n').filter(Boolean);
        envVars.forEach((variable) => {
            if (variable.trim()[0] === '#') {
                return;
            }
            let envVariable = variable.split('=').filter(Boolean);
            if (envVariable.length !== 2) {
                throw new Error (util.format('Environment variable %s is not valid', variable));
            }
            if (process.env[envVariable[0]] === undefined) {
                process.env[envVariable[0]] = envVariable[1];
            }
        });
    }
}