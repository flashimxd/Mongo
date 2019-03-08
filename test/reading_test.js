const assert = require('assert');
const User = require('../src/user');

describe('Reading users from the db', () => {

    let god;

    beforeEach((done) => {
        god = new User({ name: 'DeusTrick'});
        god.save()
            .then(() => done());
    });

    it('find all users with name.. DeusTrick', (done) => {
        User.find({name : 'DeusTrick'})
            .then(users => {
                assert(users[0]._id.toString() === god._id.toString());
                done();
            } );
    });

    it('find a user by id', (done) => {
        User.findOne({_id : god._id})
            .then(user => {
                assert(user.name === 'DeusTrick');
                done();
            } );
    })
});