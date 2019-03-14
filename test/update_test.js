const assert = require('assert');
const User = require('../src/user');

describe('Update users from the db', () => {

    let god;

    beforeEach((done) => {
        god = new User({ name: 'DeusTrick', postCount: 0});
        god.save()
            .then(() => done());
    });

    assertName = operation => done => {
        operation
        .then(() => User.find({}))
        .then(users => {
            assert(users.length === 1);
            assert(users[0].name === 'Fabin Santos');
            done();
        } );
    }   

    it('Update Model instance set and save', (done) => {
        god.set('name', 'Fabin Santos');
        assertName(god.save())(done);  
    });

    it('Update Model instance can update', (done) => {
        assertName(god.update({name: 'Fabin Santos'}))(done);  
    });

    it('A Model Class can update', (done) => {
        assertName(User.update({name: 'DeusTrick'}, {name: 'Fabin Santos'}))(done);  
    });

    it('A Model Class can update one Record', (done) => {
        assertName(User.findOneAndUpdate({name: 'DeusTrick'}, {name: 'Fabin Santos'}))(done);  
    });

    it('A Model Class can find one by id and update', (done) => {
        assertName(User.findByIdAndUpdate(god._id, {name: 'Fabin Santos'}))(done);  
    });

    it('A User can update its likes by 1', (done) => {
        User.update({ name: 'DeusTrick'}, {$inc: { likes: 1 }})
            .then(() => User.findOne({ name: 'DeusTrick' }))
            .then(user => {
                assert(user.likes === 1);
                done();
            })
    });
});