'use strict'
const cheerio = require('cheerio')


describe('/phases', function(){
  
  beforeEach(function(done){
    this.webServer = createWebserverAgent()
    this.webServer.loginAsLearner(done)
  })
  
  it('should render the phase README', function(done){
    this.webServer
    .get('/phases')
    .end(function(error, response){
      if (error) return done(error)
      const $ = cheerio.load(response.text)
      expect(response).to.have.status(200)
      expect(response.text).to.be.a.string
      expect($('h1').text()).to.equal('Phases')
      expect($('.markdown-body ul li').first().text()).equal('Phase 1')
      done()
    })
  })
  
  describe('/phases/1', function(){  
    it('should render phase 1 README', function(done){
      this.webServer
      .get('/phases/1')
      .end(function(error, response){
        if (error) return done(error)
        const $ = cheerio.load(response.text)
        expect(response).to.have.status(200)
        expect(response.text).to.be.a.string
        expect($('h1').text()).to.equal('Phase 1')
        expect($('.phase-modules-list')).to.exist
        done()
      })
    })
  })
  
  describe('/phases/1/schedule', function(){
    it('should render phase 1 schedule', function(done){
      this.webServer
      .get('/phases/1/schedule')
      .end(function(error, response){
        if (error) return done(error)
        const $ = cheerio.load(response.text)
        expect(response).to.have.status(200)
        expect(response.text).to.be.a.string
        expect($('iframe').attr('class')).to.equal('phase-calendar-iframe')
        done()
      })
    })
  })
  
  describe('/phases/3/goals', function(){
    it('should render phase 1 skills', function(done){
      this.webServer
      .get('/phases/3/goals')
      .end(function(error, response){
        if (error) return done(error)
        const $ = cheerio.load(response.text)
        expect(response).to.have.status(200)
        expect(response.text).to.be.a.string
        expect($('iframe').attr('src')).to.equal('https://jsdev.learnersguild.org')
        done()
      })
    })
  })

  describe('/phases/1/*', function(){
    it('should render 404 page', function(done){      
      this.webServer
      .get('/phases/1/typeAnythingElseHere')
      .end(function(error, response){
        const $ = cheerio.load(response.text)
        expect(response).to.have.status(404)
        expect(response.text).to.be.a.string
        expect($('h1').text()).to.equal('Page Not Found')
        done()
      })
    })
  })
})
