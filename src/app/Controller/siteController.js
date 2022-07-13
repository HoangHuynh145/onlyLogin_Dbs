class SiteController {
    // [GET] /
    start(req, res, next) {
        res.send('Hello Guys!')
    }
    
}

module.exports = new SiteController
