const db = require('../models')
const { QueryTypes } = require('sequelize');
const Op = db.Sequelize.Op;
const fs = require('fs');
const { ifError } = require('assert');

class Public {
  // get product
  async getProducts(req, res) {

    let name = req.query.name;

    if(!name) {
        name = ''
    }

    try {
        const products =  await db.Products.findAll({
            attributes: ['id', 'name', 'price', 'description', 'averageRating', 'numberRating', 'imageUrl'],
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

  async getImage(req, res) {
    let imgName = 'upload/' + req.query.imgName;
    
    fs.readFile(imgName, (err, img) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "can't load image"
            })
        }
        res.writeHead(200, {"Content-Type" : "image/jpeg"})
        res.end(img)
    })
  }
}

module.exports = new Public
