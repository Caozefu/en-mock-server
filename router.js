const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const config = require('./mock');
const control = require('./controller')

const fileBasePath = path.resolve(__dirname, './mock/config');
config.forEach(item => {
    const file = JSON.parse(fs.readFileSync(path.join(fileBasePath, item), 'utf-8'));
    for (const key in file) {
        router[file[key].toLowerCase()](key, control(key))
    }
});
// router.post('/save', controller.save);

module.exports = router;
