
module.exports = function(req, res, GlobData, WORDS) {

    var data = {};
    data.WORDS = WORDS;
    data.layout = false;

    res.render('list', data);
    
}


