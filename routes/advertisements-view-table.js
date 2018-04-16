var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {

	console.log(req.query.date);

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

		/* pool.query() is shortcut for pool.getConnection() + connection.query() + connection.release() - see https://github.com/felixge/node-mysql/blob/master/lib/Pool.js#L194-L207 */
		res.locals.mySQLPool.query(sqlQuery, function (error, results, fields) {
			if(error){
				res.send({"status": 500, "error": error});
			}else{
				res.send({"status": 200, "error": null, "advertisementsTableData": results});
			}
		});
});

module.exports = router;
