<h1>Advertisement Inspector</h1>

<p> This project is a part of a larger data collection and research project for the <b>real estate market</b>. 
The idea is to collect advertisements in certain locations with certain features 
and then distinguish between Ad posts made by users with just one post and those users who have a lot of posts.</p>
<p>Users with large posts volume are expected to be agencies or just fake posts. Such accounts generate
large number of advertisements with a lot of duplicates and make impossible to see real estate market trends</p>
<p>Users with just one post expected to be owners of real estate posted.
After data collected it is possible to see how many advertisements was open and how many was closed to see real estate market trends.</p>
<p>Technologies used on server side are <b>NodeJS/Express</b> with <b>MySQL</b> database. 
Server side application provides Rest endpoints for front-end single-page web application. The front-end built with <b>React/Redux</b> and <b>Bootstrap</b>. Here the UI overview:</p>

![Front-end overview](https://github.com/pavlomorozov/AdvertisementInspector/blob/master/screenshot/overview.png)

<p>The next illustration helps to understand how Advertisements View components placed and their names:</p>

![Advertisements View components](https://github.com/pavlomorozov/AdvertisementInspector/blob/master/screenshot/key_components.png)

<p> The statistics component - Key Statistics, built to track monthly advertisement volumes 
placed by all users as well as by users with just one advertisement posted. Server side aggregates and structures 
data with SQL and then provides it to front-end React component with REST http call.
Chart shows data of users with just one advertisement post.<p/>

![Ke statistics component](https://github.com/pavlomorozov/AdvertisementInspector/blob/master/screenshot/ad_statistics.PNG)
