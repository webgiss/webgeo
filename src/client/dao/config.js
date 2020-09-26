class ConfigDao {
    constructor() {
        this._config = {
            useDebug: true,
        };
    }

    get config() {
        return this._config;
    }
}

export default new ConfigDao(); 
