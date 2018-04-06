var express = require('express');
//var mysql = require("mysql");

var router = express.Router();

router.get('/', function(req, res, next) {

	var sqlQuery = `
      SELECT
          advertisement.id,
          status.updated,
          status.is_open,
          advertisement.caption,
          advertisement.location
      FROM status

      LEFT JOIN advertisement
      ON advertisement.id = status.advertisement

      ORDER BY updated DESC
      LIMIT 5
	`;

	res.locals.connection.query(sqlQuery
	, function (error, results, fields) {
		if(error){
			//res.send({"status": 500, "error": error, "lastAdvertisements": null});
			res.send({"status": 500, "error": error});
		}else{
			res.send({"status": 200, "error": null, "lastAdvertisements": results});
		}
	});
});


module.exports = router;
