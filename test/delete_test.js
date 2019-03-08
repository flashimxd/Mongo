const assert = require('assert');
const User = require('../src/user');

describe('Delete users from the db', () => {

    let god;

    beforeEach((done) => {
        god = new User({ name: 'DeusTrick'});
        god.save()
            .then(() => done());
    });

    it('Model instance delete', (done) => {
        god.remove()
            .then(() => User.findOne({name: 'DeusTrick'}))
            .then(user => {
                assert(user === null);
                done();
            } );
    });

    it('Class instance delete', (done) => {
        User.deleteOne({name : 'DeusTrick'})
            .then(() => User.findOne({name: 'DeusTrick'}))
            .then(user => {
                assert(user === null);
                done();
            } );
    });

    it('Class instance findOneAndDelete', (done) => {
        User.findOneAndDelete({name : 'DeusTrick'})
            .then(() => User.findOne({name: 'DeusTrick'}))
            .then(user => {
                assert(user === null);
                done();
            } );
    });

    it('Class instance findByIdAndRemove', (done) => {
        User.findByIdAndRemove(god._id)
            .then(() => User.findOne({name: 'DeusTrick'}))
            .then(user => {
                assert(user === null);
                done();
            } );
    });
});