const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const configPath = path.resolve(__dirname, '../mock/config');
let config = [];
try {
    config = fs.readdirSync(configPath);
} catch(e) {
    console.log(chalk.green('找不到目录，请检查路径'))
}

module.exports = config;
