const model = require('../models/story');
exports.index = (req, res)=>{
    //res.send('send all stories');
    let stories = model.find();
    res.render('./story/index', {stories});
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res)=>{
    //res.send('Created a new story');
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let story = model.findById(id);
    if(story) {
        res.render('./story/show', {story});
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
   
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let story = model.findById(id);
    if(story) {
        res.render('./story/edit', {story});
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next)=>{
    let story = req.body;
    let id = req.params.id;

   if (model.updateById(id, story)) {
       res.redirect('/stories/'+id);
   } else {
    let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
   }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id))
        res.redirect('/stories');
    else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};