const assert = require('assert');
const BlogPost = require('../src/blogPost');
const User = require('../src/user');

describe('Middlewares', () => {
    let user, blogPost;
    beforeEach((done) => {
        user = new User({ name: 'Batistuta' });
        blogPost = new BlogPost({ title: 'Dear god', content: 'Help me to handle all these dumbs' });
        user.blogPosts.push(blogPost);
        Promise.all([ user.save(), blogPost.save()])
            .then(() => done())
    });

    it('can remove an user and its blogPosts', (done) => {
       user.remove()
        .then(() => BlogPost.count())
        .then(count => {
            assert(count === 0);
            done();
        })
    });
});