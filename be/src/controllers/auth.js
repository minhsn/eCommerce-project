const db = require('../models')
const jwt = require('jsonwebtoken')

class Auth {
  // api register
  async register(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).send({
        message: "username or password is null",
      });
    }
    try {
      const [user, created] = await db.User.findOrCreate({
        where: { username: username },
        defaults: {
          username: username,
          password: password,
        },
      });
      if (!created) {
        return res.status(400).send({
          message: "user have in database",
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: "database error",
      });
    }

    return res.status(201).send({
      message: "register success",
    });
  }

  // api login
  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // check validate.
    if (!username || !password) {
        return res.status(400).send({
          message: "username or password is null",
        });
      }
    try {
        const user = await db.User.findOne({
            where: {
                username: username,
                password: password
            }
        })
        if (user) {
            const token = jwt.sign({_id: user._id}, process.env.secret)
            return res.send({
                message: 'login success',
                token: token
            })
        } else {
            return res.status(400).send({
                message: 'username or password incorrect'
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "database error",
          });
    }
  }
}

module.exports = new Auth
