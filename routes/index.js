var express = require('express');
var router = express.Router();

var LastAdvertisementsController = require('../controllers/LastAdvertisementsController');
var KeyStatisticsController = require('../controllers/KeyStatisticsController');
var AdvertisementViewTableController = require('../controllers/AdvertisementViewTableController');
var AdvertisementDetailsController = require('../controllers/AdvertisementDetailsController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/last-advertisements', LastAdvertisementsController.getLastAdvertisements);
router.get('/api/key-statistics', KeyStatisticsController.getStatistics);
router.get('/api/advertisements-view-table', AdvertisementViewTableController.getTableData);
router.get('/api/advertisement-details', AdvertisementDetailsController.getAdvertisementDetails);

module.exports = router;
