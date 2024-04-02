const db = require('../dbModel');

const neighborsController = {};

neighborsController.getNeighbors = async (req, res, next) => {
  try {
    const queryText =`SELECT * FROM users WHERE username <> ($1)`;
    const value = [ req.body.username ];
    const neighbors = await db.query(queryText, value);
    res.locals.neighbors = neighbors.rows;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = neighborsController;