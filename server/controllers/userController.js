const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (req, res, next) => {
  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash()
  // })
  console.log(req.body);
  next();
}

module.exports = userController;