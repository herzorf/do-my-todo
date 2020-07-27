const {program} = require("commander");
const API = require("./index");
//声明命令
program
    .option("-x , --xxx", "xxxx");

//声明子命令add 和 clear
program
    .command("add")
    .description("添加一个任务")
    .action((command) => {
        const words = command.args.join(" ");
        void API.add(words);
    });
program
    .command("clear")
    .description("清空所有任务")
    .action(() => {
        void API.clear();
    });

if (process.argv.length === 2) {
    void API.showAll();
} else {
    program.parse(process.argv);
}
