import api from '../../../Back_API'

describe('Registration Test', () => {

    it('respond with json', function (done) {
        api
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done()
            });
    })
})