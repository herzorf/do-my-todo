const db = require("./db");
//添加任务
module.exports.add = async (words) => {
    const list = await db.read();
    const task = {
        words,
        done: false
    };
    list.push(task);
    console.log(list);
    await db.write(list);
};
//清空任务
module.exports.clear = async () => {
    await db.write([]);
};
//展示所有任务
module.exports.showAll = async () => {
    console.log("展示所有任务");
};