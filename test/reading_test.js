const assert = require('assert');
const User = require('../src/user');

describe('Reading users from the db', () => {

    let god, godOfFire, godOfRuble, godOfIce;

    beforeEach((done) => {
        godOfFire = new User({ name: 'Ace' });
        god = new User({ name: 'DeusTrick'});
        godOfRuble = new User({ name: 'Luffy' });
        godOfIce = new User({ name: 'Ryuma' });
        Promise.all([
            god.save(),
            godOfFire.save(),
            godOfRuble.save(),
            godOfIce.save(),
        ])
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
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then(users => {
                assert(users.length == 2);
                assert(users[0].name === 'DeusTrick');
                assert(users[1].name === 'Luffy');
                done();
            });
    });
});