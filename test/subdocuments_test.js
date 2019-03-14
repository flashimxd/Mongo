const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Cam create a subdocument', (done) => {
        const Bill = new User({ name: 'Bill', posts: [{title: 'postTitle'}]})
        Bill.save()
            .then(() => {
                User.findOne({name: 'Bill'})
                    .then(user => {
                        assert(user.posts[0].title === 'postTitle')
                        done()
                    })
            })
    })

    it('User can add a subdocument', (done) => {
        const Bill = new User({
            name: 'Bill',
            posts: []
        })

        Bill.save()
            .then(() => {
                User.findOne({ name: 'Bill'})
                    .then(user => {
                        user.posts.push({ title: 'New Post' })
                        return user.save()
                    }) 
                    .then(() => User.findOne({ name: 'Bill' }))
                    .then(user => {
                        assert(user.posts[0].title === 'New Post')
                        done()
                    })
            })
    })

    it('Can remove an existent subdocument', (done) => {
        const Bill = new User({
            name: 'Bill',
            posts: [{ title: 'New Post' }]
        })

        Bill.save()
            .then(() => {
                User.findOne({ name: 'Bill'})
                    .then(user => {
                        user.posts[0].remove()
                        return user.save()
                    }) 
                    .then(() => User.findOne({ name: 'Bill' }))
                    .then(user => {
                        assert(!user.posts.length)
                        done()
                    })
            })
    })
})