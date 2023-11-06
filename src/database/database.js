import connection from "./database-connection.js";

class Database {
    constructor() {}

    static async executeQuery(query) {
        return await new Promise((resolve, reject) => {
            connection.query(query, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
                return;
            });
        });
    }
}

export default Database;