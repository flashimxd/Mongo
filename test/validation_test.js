const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
    it('Requires a User Name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.')
     });

     it('Requires a User Name longer than 3 characters', () => {
        const user = new User({ name: 'BO' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 3 characters.')
     })

     it('disabllows invalid records from being save', (done) => {
        const user = new User({ name: 'BO' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 3 characters.');
                done();
            })
        })
});