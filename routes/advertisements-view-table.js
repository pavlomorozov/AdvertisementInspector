var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {

	var sqlQuery = `
	SELECT
	  user_data.name as user_name,
		user_data.ads_number,
	  user_data.url as user_url,
	  SUBSTRING(user_data.url, 9, 10) as link_pattern,
	  user_data.user_since,
	  user_data.id as user_id,

		advertisement.id as ad_id,
	  advertisement.caption,
		advertisement.location,
	  price_activity.activity as price_activity,
	  price_init.price as init_price,
	  price_last.price as last_price,
	  status_activity.activity as status_activity,
		CASE
			WHEN (status_max.is_open=0) THEN datediff(status_max.updated, status_min.updated)
			WHEN (status_max.is_open=1) THEN datediff(NOW(), status_min.updated)
	    END AS open_days,
		status_min.updated as first_update,
	  status_min.is_open as first_is_open,
	  status_max.updated as last_update,
	  status_max.is_open as last_is_open,
	  advertisement.published_at,
	  advertisement.url as ad_url
	FROM advertisement

	-- init price
	LEFT JOIN(
		SELECT
			price.advertisement,
			price.value as price
		FROM price
		INNER JOIN
			(SELECT
				advertisement,
				MIN(updated) as updated
			FROM
				price
			GROUP BY
				advertisement) AS init_date
		ON
			price.advertisement = init_date.advertisement
			AND price.updated = init_date.updated) AS price_init
	ON
		price_init.advertisement = advertisement.id

	-- last price
	LEFT JOIN(
		SELECT
			price.advertisement,
			price.value as price
		FROM price
		INNER JOIN
			(SELECT
				advertisement,
				MAX(updated) as updated
			FROM
				price
			GROUP BY
				advertisement) AS last_date
		ON
			price.advertisement = last_date.advertisement
			AND price.updated = last_date.updated) AS price_last
	ON
		price_last.advertisement = advertisement.id

	-- price activity
	LEFT JOIN(
		SELECT
			advertisement,
			count(1) as activity
		FROM
			price
		GROUP BY
			advertisement) AS price_activity
	ON
		price_activity.advertisement = advertisement.id

	-- min_updated
	LEFT JOIN (
		select
			status.advertisement,
			status.is_open,
			status_min_date.updated
		from status
		inner join
			(select
				advertisement,
				min(updated) as updated
			from status
			group by advertisement) as status_min_date
		ON
			status.updated = status_min_date.updated
			and status.advertisement = status_min_date.advertisement) as status_min
	ON
		status_min.advertisement = advertisement.id

	-- max updated
	LEFT JOIN(
		select
			status.advertisement,
			status.is_open,
			status_max_date.updated
		from status
		inner join
			(select
				advertisement,
				max(updated) as updated
			from status
			group by advertisement) as status_max_date
		on
			status.updated = status_max_date.updated
			and status.advertisement = status_max_date.advertisement) as status_max
	ON
		status_max.advertisement = advertisement.id

	-- status activity
	LEFT JOIN(select
			advertisement,
			count(1) as activity
		from status
		group by
			advertisement) as status_activity
	ON
		status_activity.advertisement = advertisement.id

	-- user_data
	LEFT JOIN
		advertisement_user_link
	    on advertisement.id = advertisement_user_link.advertisement_id
	LEFT JOIN (
		SELECT
			ad_user.id,
			ad_user.name,
			ad_user.url,
			ad_user.user_since,
			count(*) as ads_number
		FROM ad_user
		LEFT JOIN advertisement_user_link
			ON ad_user.id = advertisement_user_link.advertisement_user_id
		GROUP BY
			ad_user.id,
			ad_user.name,
			ad_user.url,
			ad_user.user_since
		) as user_data
	ON advertisement_user_link.advertisement_user_id = user_data.id

	where status_min.updated>=? AND status_min.updated<? `;

		const dateFrom = new Date(req.query.dateFrom);
		const dateTo = new Date(req.query.dateTo);
		dateTo.setDate(dateTo.getDate()+1);

		res.locals.mySQLPool.query(sqlQuery, [dateFrom, dateTo],function (error, results, fields) {
			if(error){
				res.send({"status": 500, "error": error});
			}else{
				res.send({"status": 200, "error": null, "advertisementsTableData": results});
			}
		});
});

module.exports = router;
