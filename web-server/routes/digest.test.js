'use strict'

const cheerio = require('cheerio')

describe('/digest', function () {
  beforeEach(function(done){
    this.webServer = createWebserverAgent()
    this.webServer.loginAsLearner(done)
  })
  
  describe('/digest.json', function(){
    it('should return the digest as a json object', function(done){
      this.webServer
        .get('/digest.json')
        .end(function(error, response){
          if (error) return done(error)
          expect(response).to.have.status(200)
          expect(response).to.be.json
          done()
        })
    })
  })
  
  describe('/digest', function(){
    it('should render the digest page', function(done){
      this.webServer
        .get('/digest')
        .end(function(error, response) {
          if (error) return done(error)
          const $ = cheerio.load(response.text)
          expect($('h1').text()).to.equal('Digest')
          expect(response.text).to.be.a.string
          done()
        })
    })
  })
})
