var getLastAdvertisements = function(req, res, next) {

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
      LIMIT ?
	`;

	const recordsLimit = 3

	res.locals.mySQLDatabase.query(sqlQuery, [recordsLimit])
	.then(results => {
		res.send({
				"status": 200,
				"error": null,
				"lastAdvertisements": results});
	}, error => {
		res.send({"status": 500, "error": error});
	});

}

exports.getLastAdvertisements = getLastAdvertisements;
