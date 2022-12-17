const {Router} = require('express')

const router = Router()
const analisisController = require('../controllers/analisis.controller')

router.post('/traducir', analisisController.traducir)

module.exports = router