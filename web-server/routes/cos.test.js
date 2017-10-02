'use strict'
const cheerio = require('cheerio')

describe('/cos', function(){
  
  beforeEach(function(done){
    this.webServer = createWebserverAgent()
    this.webServer.loginAsLearner(done)
  })
  
  it('should render cos readme.md', function(done) {
    this.webServer
    .get('/cos')
    .end(function(error, response){
      if (error) return done(error)
      const $ = cheerio.load(response.text)
      expect(response).to.have.status(200)
      expect(response.text).to.be.a.string
      expect($('h1').text()).to.equal('Cultural Operating System')
      done()
    })
  }) 

  it('should render 404 if page not found', function(done) {
    this.webServer
    .get('/cos/unknownpage')
    .end(function(error, response){
      const $ = cheerio.load(response.text)
      expect(response).to.have.status(404)
      expect(response.text).to.be.a.string
      expect($('h1').text()).to.equal('Page Not Found')
      done()
    })
  }) 
})
