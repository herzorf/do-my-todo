const db = require("./db");
const inquirer = require("inquirer");

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
    const list = await db.read();
    inquirer
        .prompt({
            type: "list",
            name: "index",
            message: "请选择你的操作",
            choices: [...list.map((task, index) => {
                return {name: `${task.done ? "[x]" : "[_]"} ${index + 1} --- ${task.words}`, value: index.toString()};
            }), {name: "退出", value: "-1"}, {name: "+创建任务", value: "-2"}]
        })
        .then((answers) => {
            const index = parseInt(answers.index);
            if (index >= 0) {
                chooseTask(list, index);
            } else if (index === -2) {
                createTask(list);
            }
        });

};

function createTask(list) {
    //创建任务
    inquirer.prompt({
        type: "input",
        name: "title",
        message: "输入任务名称",
    }).then((answer) => {
        list.push({
            words: answer.title,
            done: false
        });
        db.write(list);
    });
}

function chooseTask(list, index) {
    //选中了一个任务
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "请选择操作",
        choices: [
            {name: "退出", value: "quit"},
            {name: "已完成", value: "markAsDone"},
            {name: "未完成", value: "markAsUndone"},
            {name: "改标签", value: "updateTitle"},
            {name: "删除", value: "remove"}
        ]
    }).then(answers2 => {
        switch (answers2.action) {
            case "markAsDone":
                markAsDone(list, index);
                break;
            case "markAsUndone":
                markAsUndone(list, index);
                break;
            case "updateTitle":
                updateTitle(list, index);
                break;
            case "remove":
                remove(list, index);
                break;
        }
    });
}

function markAsDone(list, index) {
    list[index].done = true;
    db.write(list);
}

function markAsUndone(list, index) {
    list[index].done = false;
    db.write(list);
}

function updateTitle(list, index) {
    inquirer.prompt({
        type: "input",
        name: "title",
        message: "新的标签",
        default: list[index].words
    }).then((answer) => {
        list[index].words = answer.title;
        db.write(list);
    });
}

function remove(list, index) {
    list.splice(index, 1);
    db.write(list);
}