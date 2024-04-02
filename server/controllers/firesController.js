const db = require('../dbModel');
const getFires = require('../../utilities/getFires');
const fs = require('fs');
const { Readable } = require('node:stream');
const { from } = require('pg-copy-streams');
const { pipeline } = require ('stream/promises');
const { Pool } = require('pg');
const async = require('async');


const firesController = {};

firesController.getFires = async (req, res, next) => {
  try {
    const firesArray = await getFires();
    res.locals.firesArray = firesArray;
    next();
  } catch (error) { next(error) }
}

// firesController.queryFires = async (req, res, next) => {

// }

// firesController.compareFires

// firesController.storeFires = async (req, res, next) => {
  
//   const queryText = `INSERT INTO fires (latitude, longitude, bright_ti4, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_ti5, frp, daynight)
//                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//                     ON CONFLICT DO NOTHING`;

  

//   // res.locals.firesArray.forEach( async fire => {
//   //   const values = [
//   //     fire.latitude,
//   //     fire.longitude,
//   //     fire.bright_ti4,
//   //     fire.scan,
//   //     fire.track,
//   //     fire.acq_date,
//   //     fire.acq_time,
//   //     fire.satellite,
//   //     fire.instrument,
//   //     fire.confidence,
//   //     fire.version,
//   //     fire.bright_ti5,
//   //     fire.frp,
//   //     fire.daynight
//   //   ];
//   //   await db.query(queryText, values);
//   // })


//   next();
// }


firesController.storeFires = async (req, res, next) => {

  const pool = new Pool({
    connectionString: 'your_connection_string_here'
  });

  try {
    const firesData = res.locals.firesArray; // Assuming firesData is an array of fire objects
    const batchSize = 100; // Number of fires to insert per batch
    const concurrency = 5; // Maximum number of concurrent inserts

    await async.eachLimit(firesData, concurrency, async (fireBatch) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        const insertQuery = `
          INSERT INTO fires (latitude, longitude, bright_ti4, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_ti5, frp, daynight)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT DO NOTHING`;

        for (const fire of fireBatch) {
          const values = [
            fire.latitude,
            fire.longitude,
            fire.bright_ti4,
            fire.scan,
            fire.track,
            fire.acq_date,
            fire.acq_time,
            fire.satellite,
            fire.instrument,
            fire.confidence,
            fire.version,
            fire.bright_ti5,
            fire.frp,
            fire.daynight
          ];

          await client.query(insertQuery, values);
        }

        await client.query('COMMIT');
        console.log('Batch inserted successfully');
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error inserting batch:', error);
      } finally {
        client.release();
      }
    });
    
    console.log(`All batches inserted successfully`);
  } catch (error) {
    console.error('Error inserting batches:', error);
  } finally {
    await pool.end();
  }

  next();
};


module.exports = firesController;