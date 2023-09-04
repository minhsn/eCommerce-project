const db = require('../models')
const Op = db.Sequelize.Op;
const fs = require('fs');

class Public {
  // get products
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

  // get product detail
  async getProductDetail(req, res) {
    const productId = req.params.productId
    console.log(productId);
    try {
        // get product data
        const product = await db.Products.findOne({
            attributes: ['id', 'name', 'price', 'description', 'averageRating', 'numberRating', 'imageUrl'],
            where: {
                deleteFlg: 0,
                id: productId
            }
        })
        if(!product) {
            return res.status(404).send({
                message: 'product not found'
            })
        }

        // get review data
        const review = await db.Review.findAll({
            attributes: ['userId', 'rate', 'comment'],
            where: {
                productId: productId
            }
        })
        return res.status(200).send({
            product: product,
            review: review
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "database error",
          })
    }
  } 

  // get image
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
