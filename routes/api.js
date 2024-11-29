const express = require('express');
const { sql, poolPromise } = require('../models/database');
const authenticate = require('../middleware/auth');

const router = express.Router();


//Listing API: Create a new listing
router.post('/listings', authenticate, async (req, res) => {
  const { host_id, title, description, country, city, price, max_people } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('host_id', sql.Int, host_id)
      .input('title', sql.VarChar, title)
      .input('description', sql.Text, description)
      .input('country', sql.VarChar, country)
      .input('city', sql.VarChar, city)
      .input('price', sql.Decimal, price)
      .input('max_people', sql.Int, max_people)
      .query(`
        INSERT INTO listings (host_id, title, description, country, city, price, max_people)
        VALUES (@host_id, @title, @description, @country, @city, @price, @max_people)
      `);
    res.status(201).send({ status: 'success', message: 'Listing created' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});


//Listing API: Query available listings with pagination 
//tried to add date filtering 
//also made sure there is only one booking on that day
router.get('/listings', async (req, res) => {
  const { country, city, page = 1, limit = 10, dateFrom, dateTo, noOfPeople } = req.query;
  const offset = (page - 1) * limit;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('country', sql.VarChar, country || null)
      .input('city', sql.VarChar, city || null)
      .input('dateFrom', sql.Date, dateFrom || null)
      .input('dateTo', sql.Date, dateTo || null)
      .input('noOfPeople', sql.Int, noOfPeople || null)
      .input('limit', sql.Int, limit)
      .input('offset', sql.Int, offset)
      .query(`
        SELECT * 
        FROM listings l
        WHERE l.max_people >= ISNULL(@noOfPeople, l.max_people)
          AND (l.country = @country OR @country IS NULL)
          AND (l.city = @city OR @city IS NULL)
          AND NOT EXISTS (
            SELECT 1 
            FROM stays s
            WHERE s.listing_id = l.id 
              AND (@dateFrom <= s.end_date AND @dateTo >= s.start_date)
          )
        ORDER BY l.id
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY
      `);
    res.status(200).send({ listings: result.recordset });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});


// Stay API: Book a stay
router.post('/stays', authenticate, async (req, res) => {
  const { listing_id, guest_id, start_date, end_date, guest_names } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('listing_id', sql.Int, listing_id)
      .input('guest_id', sql.Int, guest_id)
      .input('start_date', sql.Date, start_date)
      .input('end_date', sql.Date, end_date)
      .input('guest_names', sql.Text, guest_names)
      .query(`
        INSERT INTO stays (listing_id, guest_id, start_date, end_date, guest_names)
        VALUES (@listing_id, @guest_id, @start_date, @end_date, @guest_names)
      `);
    res.status(201).send({ status: 'success', message: 'Stay booked' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});


// Review API: Add a review for a stay
router.post('/reviews', authenticate, async (req, res) => {
  const { stay_id, rating, comment } = req.body;
  try {
    const pool = await poolPromise;

    // Validate that the user booked the stay
    const stayResult = await pool.request()
      .input('stayId', sql.Int, stay_id)
      .input('userId', sql.Int, req.user.id)
      .query(`
        SELECT 1 FROM stays 
        WHERE id = @stayId AND guest_id = @userId
      `);

    if (stayResult.recordset.length === 0) {
      return res.status(403).send({ status: 'error', message: 'You can only review your own stays' });
    }

    // Insert the review
    await pool.request()
      .input('stay_id', sql.Int, stay_id)
      .input('rating', sql.Int, rating)
      .input('comment', sql.Text, comment || null)
      .query(`
        INSERT INTO reviews (stay_id, rating, comment)
        VALUES (@stay_id, @rating, @comment)
      `);
    res.status(201).send({ status: 'success', message: 'Review submitted' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});


// Admin API: Generate report with average ratings
router.get('/admin/report', authenticate, async (req, res) => {
  const { country, city, page, limit } = req.query;
  const offset = (page - 1) * limit;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('country', sql.VarChar, country)
      .input('city', sql.VarChar, city)
      .input('limit', sql.Int, limit)
      .input('offset', sql.Int, offset)
      .query(`
        SELECT l.*, 
               AVG(r.rating) AS averageRating
        FROM listings l
        LEFT JOIN stays s ON l.id = s.listing_id
        LEFT JOIN reviews r ON s.id = r.stay_id
        WHERE 
          (l.country = @country OR @country IS NULL) AND
          (l.city = @city OR @city IS NULL)
        GROUP BY l.id, l.host_id, l.title, l.description, l.country, l.city, l.price, l.max_people
        ORDER BY averageRating DESC
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY
      `);
    res.status(200).send({ listings: result.recordset });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});


module.exports = router;
