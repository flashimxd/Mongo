const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });

before((done) => {
    mongoose.connection
    .once('open', () => done())
    .on('error', (error) => console.warn('Warning', console.error()
    ));
});

beforeEach((done) => {
    const {users, comments, blogposts} = mongoose.connection.collections
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })
    });
})