const fs = require('fs');
const path = require('path');
const config = require('../mock');

const baseUrl = path.resolve(__dirname, '../mock/model');
function fn(key) {
    const content = fs.readFileSync(`${path.join(baseUrl, key)}.json`, 'utf-8');
    return (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(content);
    }
}

module.exports = fn;

