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
    console.log(firesArray.length);
    next();
  } catch (error) { next(error) }
}

firesController.queryFires = async (req, res, next) => {
  const queryResponse = await db.query(`SELECT * FROM fires`);
  res.locals.firesArray = queryResponse.rows;
  next();
}

firesController.storeFires = async (req, res, next) => {
  
  const queryText = `INSERT INTO fires (latitude, longitude, bright_ti4, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_ti5, frp, daynight)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                    ON CONFLICT DO NOTHING`;


  try {
    for (const fire of res.locals.firesArray) {
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
      await db.query(queryText, values);
    }
    console.log('loop executed');
    next();
  } catch (error) {
    // Handle error
    console.error('Error storing fires:', error);
    next(error);
  }
}

module.exports = firesController;