const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema(
    {
        title: {type: String, required: [true, "Title is required"] },
        author: {type: String, required: [true, "Author is required"]},
        content: {type: String, required: [true, "Content is required"], minLength: [10, "Content should be at least 10 characters"]},
    },
    {timestamps: true}
);

// collection name is stories in db
const Story = mongoose.model('Story', storySchema);

let story = new Story(
    {
        title: 'Test Story',
        author: 'Sudhamsh',
        content: 'Story',
    }
)

story.validate()
.then(() => console.log("validation successful"))
.catch(err => console.log(err.message))
console.log(story);