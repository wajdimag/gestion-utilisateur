
const yup = require('yup');
const bcrypt = require('bcrypt');

const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

const validate = async (req, res, next) => {
  try {
    const Schema = yup.object().shape({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().matches(passwordRegex, 'Password is not strong enough')
    });

    await Schema.validate(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

module.exports = validate;

