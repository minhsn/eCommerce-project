const db = require('../models')
const { QueryTypes } = require('sequelize');
const Op = db.Sequelize.Op;

class Public {
  // get product
  async getProducts(req, res) {

    let name = req.query.name;

    if(!name) {
        name = ''
    }

    try {
        const products =  await db.Products.findAll({
            attributes: ['id', 'name', 'price', 'description', 'averageRating', 'numberRating'],
            where: {
                deleteFlg: 0,
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        console.log(products);
        
        return res.status(200).send(products);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "database error",
          })
    }
  }
}

module.exports = new Public
