const db = require('../models')
const { QueryTypes } = require('sequelize');

class Public {
  // get product
  async getProducts(req, res) {

    let name = req.query.name;
    let element = req.query.element;

    console.log(name);

    try {
        const products =  await db.sequelize.query(`SELECT * FROM Products where deleteFlg = 0 and name like :name`, {
            model : db.Products,
            mapToModel: true ,
            replacements: { 
                name: `%${name}%`
        },
            type: QueryTypes.SELECT
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
