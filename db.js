const homedir = process.env.HOME || require("os").homedir();
const fs = require("fs");
const path = require("path");
const dbPath = path.join(homedir, "./todo");
const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: "a+"}, (error, data) => {
                if (error) {reject(error);} else {
                    let list;
                    try {
                        list = JSON.parse(data.toString());
                    } catch (error) {
                        list = [];
                    }
                    resolve(list);
                }
            });
        });
    },
    write(list, path = dbPath) {
        return new Promise(((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(list), (error) => {
                if (error) {return reject(error);}
                resolve();
            });
        }));
    }
};
module.exports = db;