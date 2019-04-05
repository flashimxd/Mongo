const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let user, blogPost, comment;
    beforeEach((done) => {
        user = new User({ name: 'Batistuta' });
        blogPost = new BlogPost({ title: 'Dear god', content: 'Help me to handle all these dumbs' });
        comment = new Comment({ content: 'I will be trying' });

        user.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = user;

        Promise.all([ user.save(), blogPost.save(), comment.save()])
            .then(() => done())
    });

    it('saves a relationship between user and blogPost', (done) => {
        User.findOne({ name: 'Batistuta'})
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'Dear god' )
                done();
            })
    });

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Batistuta'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then(user => {
                assert(user.name == 'Batistuta')
                assert(user.blogPosts[0].title == 'Dear god')
                assert(user.blogPosts[0].comments[0].content === 'I will be trying')
                assert(user.blogPosts[0].comments[0].user.name == 'Batistuta')
                done();
            })
    })
});