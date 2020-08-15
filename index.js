const express = require('express')
const pg = require('pg')
require('dotenv').config()

const app = express()
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
const pool = new pg.Pool()

const queryHandler = (req, res, next) => {
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

// Ideally this should come form a database of some kind
const apikeys = [
  "QeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5",
  "jWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x"
];

/**
 * Middle ware to validate API Key
 */
app.use((req, res, next) => {

  const apikey = req.headers["x-api-key"];

  // Verify login and password are set and correct
  if ( apikeys.indexOf(apikey) > -1 ) {
    // Access granted
    return next();
  }

  // Access denied
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');

});

/**
 * Middleware for rate limiting
 */
app.use((req, res, next) => {

  const apikey = req.headers["x-api-key"];
  // Valididate by this point
  
  

  // Access denied
  res.set('WWW-Authenticate', 'Basic realm="4029"');
  res.status(429).send('Too many requests.');

});

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
})

app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
