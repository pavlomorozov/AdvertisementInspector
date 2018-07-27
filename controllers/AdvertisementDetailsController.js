var getAdvertisementDetails = function(req, res, next) {

	const detailsQuery = `
    SELECT * FROM parameter
    WHERE advertisement = ?`;

  const descriptionQuery = `
  SELECT
	description.id,
    advertisement,
    updated,
    value
  FROM description
  LEFT JOIN description_text
  ON description_text.id = description.description_text_id
  WHERE advertisement = ?`;

  const customTagsQuery = `
    SELECT * FROM olxdb.custom_tag
    WHERE advertisement = ?`;

	const id = req.query.id;

  var responseData = {};

  res.locals.mySQLDatabase.query(detailsQuery, [id])
  .then(results => {
    responseData.advertisementDetails = results;
    return res.locals.mySQLDatabase.query(descriptionQuery, [id]);
  }).then(results => {
    responseData.advertisementDescription = results;
    return res.locals.mySQLDatabase.query(customTagsQuery, [id]);
  }).then(results => {
    responseData.advertisementTags = results;
    res.send({
        "status": 200,
        "error": null,
        "advertisementDetails": responseData});
  }).catch (error => {
    res.send({"status": 500, "error": error});
  });
}

exports.getAdvertisementDetails = getAdvertisementDetails;
