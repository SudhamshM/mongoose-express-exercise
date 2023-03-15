const Story = require('../models/story');
exports.index = (req, res, next)=>{
    //res.send('send all stories');
    Story.find()
    .then((stories) => res.render('./story/index', {stories}))
    .catch(err => next(err));
    
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
    let story = new Story(req.body);
    story.save() // insert the document into the database
    .then((story) =>
    {
        console.log(story);
        res.redirect('/stories')
    })
    .catch(err => 
        {
            if (err.name == 'ValidationError')
            {
                err.status = 400;
            }
            next(err)
        });
};

exports.show = (req, res, next) =>
{
    let id = req.params.id;
    // objectId is a 24-bit hex string, so if id is less than that, we get an error
    if (!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err = new Error(`Invalid story id ${id}`);
        err.status = 400;
        return next(err);
    }
    Story.findById(id)
    .then((story) =>
    {
        if(story)
        {
            res.render('./story/show', {story});
        }
        else
        {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
    
   
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    // verify id is 24-bit hex string for objectId
    if (!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err = new Error(`Invalid story id ${id}`);
        err.status = 400;
        return next(err);
    }
    Story.findById(id)
    .then((story) =>
    {
        if(story)
        {
            res.render('./story/edit', {story});
        }
        else
        {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.update = (req, res, next)=>{
    let story = req.body;
    let id = req.params.id;
    // verify id is 24-bit hex string for objectId
    if (!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err = new Error(`Invalid story id ${id}`);
        err.status = 400;
        return next(err);
    }

   Story.findByIdAndUpdate(id, story, {useFindAndModify: false, runValidators: true})
       .then((story) =>
       {
        if (story)
        {
            res.redirect('/stories/' + id);
        }
        else
        {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
       })
       .catch(err =>
        {
            if (err.name == 'ValidationError')
            {
                err.status = 400;
            }
            next(err);
        })
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err = new Error(`Invalid story id ${id}`);
        err.status = 400;
        return next(err);
    }

    Story.findByIdAndDelete(id, {useFindAndModify: false})
    .then(story =>
        {
            if (story)
            {
                res.redirect('/stories');
            }
            else
            {
                let err = new Error('Cannot find a story with id ' + id);
                err.status = 404;
                next(err);
            }
        })
    .catch(err => next(err));
};