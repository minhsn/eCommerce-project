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
          sdt: req.body.sdt,
          address: req.body.address,
          email: req.body.email
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
            const token = jwt.sign({data: `${user.id}`}, process.env.secret)
            return res.json({
                message: 'login success',
                token: token,
                role: user.role
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

  // check login
  async checkLogin(req, res, next) {
    try {
      let token = req.cookies?.token
      if(!token){
        return res.status(403).json({
          message: 'please login'
        })
      }

      console.log(token);
      const userId = jwt.decode(token, process.env.secret)
      const user = await db.User.findOne({
        where: {
          id: userId.data,
          role: '01'
          }
        })
      if(!user) throw Error
      next()
    } catch (error) {
      return res.status(500).json({
        message: 'please login'
      })
    }

  }
}

module.exports = new Auth
