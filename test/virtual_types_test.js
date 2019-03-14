const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount return number of posts', (done) => {
        const Bill = new User({
            name: 'Bill',
            posts: [{ title: 'NewPost'}]
        })

        Bill.save()
            .then(() => User.findOne({ name: 'Bill'}))
                .then(user => {
                    assert(Bill.postCount === 1)
                    done()
                })
    })
})