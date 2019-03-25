var getStatistics = function(req, res, next) {

	var sqlQuery = `
    SELECT * FROM (
		SELECT
			  CONCAT(open_data.year, "-", open_data.month) AS timeInterval,
			  open_data.year as year,
			  open_data.month as month,
			  open_data.opened,
			  closed_data.closed,
			  opened_by_user_with_1_advertisement.opened AS openedByUserWith1advertisement,
			  closed_by_user_with_1_advertisement.closed AS closedByUserWith1advertisement
			FROM
				(SELECT
					YEAR(status_min_date.updated) as year,
					MONTH(status_min_date.updated) as month,
					COUNT(1) AS opened
				FROM status
				INNER JOIN
					(SELECT
						advertisement,
						MIN(updated) AS updated
					FROM status
					GROUP BY advertisement) AS status_min_date
				ON
					status.updated = status_min_date.updated
					AND status.advertisement = status_min_date.advertisement
				GROUP BY
					YEAR(status_min_date.updated),
					MONTH(status_min_date.updated)) as open_data
			LEFT JOIN
				(SELECT
				YEAR(status_max_date.updated) as year,
				MONTH(status_max_date.updated) as month,
				COUNT(1) closed
			FROM status
			INNER JOIN
				(SELECT
					advertisement,
					MAX(updated) AS updated
				FROM status
				GROUP BY advertisement) AS status_max_date
				ON
					status.updated = status_max_date.updated
					AND status.advertisement = status_max_date.advertisement
				WHERE
					status.is_open = false
				GROUP BY
					YEAR(status_max_date.updated),
					MONTH(status_max_date.updated)) as closed_data
			ON open_data.year = closed_data.year AND open_data.month = closed_data.month
	
			LEFT JOIN
				(SELECT
					YEAR(status_min_date.updated) as year,
					MONTH(status_min_date.updated) as month,
					COUNT(1) AS opened
				FROM status
				INNER JOIN
					(SELECT
						advertisement,
						MIN(updated) AS updated
					FROM status
					GROUP BY advertisement) AS status_min_date
				ON
					status.updated = status_min_date.updated
					AND status.advertisement = status_min_date.advertisement
				-- user_data
				LEFT JOIN
					advertisement_user_link
					ON status.advertisement = advertisement_user_link.advertisement_id
					LEFT JOIN (
						SELECT
							ad_user.id,
							ad_user.name,
							ad_user.url,
							ad_user.user_since,
							COUNT(*) AS ads_number
						FROM ad_user
						LEFT JOIN advertisement_user_link
							ON ad_user.id = advertisement_user_link.advertisement_user_id
						GROUP BY
							ad_user.id,
							ad_user.name,
							ad_user.url,
							ad_user.user_since
						) AS user_data
					ON advertisement_user_link.advertisement_user_id = user_data.id
				WHERE
					user_data.ads_number=1
				GROUP BY
					YEAR(status_min_date.updated),
					MONTH(status_min_date.updated))as opened_by_user_with_1_advertisement
			ON open_data.year = opened_by_user_with_1_advertisement.year
				AND open_data.month = opened_by_user_with_1_advertisement.month
	
			LEFT JOIN
					(SELECT
				YEAR(status_max_date.updated) as year,
				MONTH(status_max_date.updated) as month,
				COUNT(1) closed
			FROM status
			INNER JOIN
				(SELECT
					advertisement,
					MAX(updated) AS updated
				FROM status
				GROUP BY advertisement) AS status_max_date
			ON
				status.updated = status_max_date.updated
				AND status.advertisement = status_max_date.advertisement
			-- user_data
			LEFT JOIN
				advertisement_user_link
				ON status.advertisement = advertisement_user_link.advertisement_id
				LEFT JOIN (
					SELECT
						ad_user.id,
						ad_user.name,
						ad_user.url,
						ad_user.user_since,
						COUNT(*) AS ads_number
					FROM ad_user
					LEFT JOIN advertisement_user_link
						ON ad_user.id = advertisement_user_link.advertisement_user_id
					GROUP BY
						ad_user.id,
						ad_user.name,
						ad_user.url,
						ad_user.user_since
					) AS user_data
				ON advertisement_user_link.advertisement_user_id = user_data.id
			WHERE
				status.is_open = false AND
				user_data.ads_number=1
			GROUP BY
				YEAR(status_max_date.updated),
				MONTH(status_max_date.updated)) as closed_by_user_with_1_advertisement
			ON open_data.year = closed_by_user_with_1_advertisement.year
				AND open_data.month = closed_by_user_with_1_advertisement.month
		  ORDER BY open_data.year DESC, open_data.month DESC
		  LIMIT 12) AS reversed_dataset
	ORDER BY reversed_dataset.year, reversed_dataset.month
	`;

	res.locals.mySQLDatabase.query(sqlQuery)
	.then(results => {
		res.send({
				"status": 200,
				"error": null,
				"keyStatistics": results});
	}, error => {
		res.send({"status": 500, "error": error});
	});

}

exports.getStatistics = getStatistics;
