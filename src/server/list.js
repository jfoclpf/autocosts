const path  = require('path');

module.exports = function(req, res, serverData, words) {

    var data = {};
    data.words = JSON.parse(JSON.stringify(words)); //clone object
    delete data.words.XX;
    data.layout = false;

    var fileToRender = path.join(serverData.directories.index, "views", "list.hbs");
    res.render(fileToRender, data);
    
}


