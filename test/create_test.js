const assert = require('assert');
const User = require('../src/user');

describe('Test User', () => {
    it('User is been save', (done) => {
        const god = new User({ name: 'DeusTrick'});
        god.save()
            .then(() => {
                assert(!god.isNew);
                done();
            })
    })
});