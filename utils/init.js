const fs = require('fs');
const path = require('path');
const config = require('../mock');
const mkdir = require('./mkdir');
const chalk = require('chalk');

// 生成对应路径的JSON文件
const configPath = path.resolve(__dirname, '../mock/config');
const modelPath = path.resolve(__dirname, '../mock/model');
config.forEach(item => {
    const files = JSON.parse(fs.readFileSync(path.resolve(configPath, item), 'utf-8'));
    for(const key in files) {
        // (files[key])
        mkdir(modelPath, `${key}.json`, err => {
            if (err) {
                console.log(chalk.red(err))
            } else {
                console.log(chalk.green('文件创建成功'))
            }
        })
    }
});
