const express = require('express');

const { sanitizePublishRequest, sanitizeSubscribeRequest, validateRequest } = require('../middlewares/request_validator');
const { publisherController, subscriberController, indexController, eventController } = require('../controller/controller');
const router = express.Router();


router.post('/publish/:topic', sanitizePublishRequest, validateRequest, publisherController);
router.post('/event', eventController)
router.post('/subscribe/:topic', sanitizeSubscribeRequest, validateRequest, subscriberController)
router.get('/', indexController);

module.exports.appRouter = router