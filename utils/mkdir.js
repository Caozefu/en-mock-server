const fs = require("fs");
const path = require("path");
const success = require('../mock/success');

function mkdir(baseUrl, pathname, callback) {
    // 需要判断是否是绝对路径(避免不必要的bug)
    // pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname, pathname);
    // 获取相对路径
    // pathname = path.relative(__dirname, pathname);
    let folders = pathname.split(path.sep); // path.sep 避免平台差异带来的bug
    let pre = "";
    folders.forEach(folder => {
        if (!folder) return
        try {
            // 没有异常，文件已经创建，提示用户改文件已经创建
            let _stat = fs.statSync(path.join(baseUrl, pre, folder));
            let hasMkdir = _stat && _stat.isDirectory();
            if (hasMkdir) {
                callback && callback(`文件${folder}已经存在，不能重复创建，请重新创建`);
            }
        } catch (error) {
            // 抛出异常，文件不存在则创建文件
            try {
                // 避免父文件还没有创建的时候先创建子文件所出现的意外bug,这里选择同步创建文件
                if (folder.match(/(.json)$/)) {
                    fs.writeFileSync(path.join(baseUrl, pre, folder), '{}');
                } else {
                    fs.mkdirSync(path.join(baseUrl, pre, folder));
                }
                callback && callback(null);
            } catch (error) {
                callback && callback(error);
            }
        }
        pre = path.join(pre, folder); // 路径拼合
    });
}

module.exports = mkdir;
