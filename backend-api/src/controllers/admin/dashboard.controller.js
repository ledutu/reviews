const fs = require('fs');

function index(request, response) {

    let { folder_name, page, limit } = request.query;

    page = parseInt(page);
    limit = parseInt(limit)

    if (!page) page = 1;
    if (!limit) limit = 10;

    link = '?';

    const BASE_PATH = './src/public/statics/uploads/users';
    path = BASE_PATH;

    imagePath = '/statics/uploads/users';

    if (folder_name) {
        if (typeof folder_name === 'string') folder_name = [folder_name];
        folder_name.map(item => {
            link += 'folder_name=' + item + '&';
        });

        folder_name.forEach(item => {
            path += '/' + item;
            imagePath += '/' + item;
        })
    }

    files = fs.readdirSync(path);
    folders = []

    files.forEach(file => {
        let isDirector = fs.lstatSync(path + '/' + file).isDirectory();
        folders = [
            ...folders,
            {
                name: file,
                type: isDirector ? 'folder' : 'file',
                path: isDirector ? '' : (imagePath + '/' + file),
            },
        ];
    });
    
    return response.render('admin/dashboard', {
        folders,
        link,
    });
}

module.exports = {
    index
}