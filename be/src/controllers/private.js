const { where } = require('sequelize');
const db = require('../models')

class Private {
  // post product
  async postProducts(req, res) {

    const t = await db.sequelize.transaction();

    let body = req.body;

    try {
        if(!body.price && !body.name) {
            return res.status(400).send({
                message: 'price and name is require'
            });
        }
        if(!(body.price % 1 === 0)){
            return res.status(400).send({
                message: 'price must be int'
            });
        }
        if(body.id) {
            await db.Products.update({
                name: body.name,
                price: body.price,
                description: body.description,
                imageUrl: req.file.filename
            },{
                where: {
                    id: body.id
                }
            }, 
            { 
                transaction: t,
                model : db.Products,
                mapToModel: true ,
            })
            await t.commit();
            return res.status(200).send({
                message: ''
            });
        } else {

            const product = await db.Products.create({
                name: body.name,
                price: body.price,
                description: body.description,
                imageUrl: req.file?.filename
            }, { 
                transaction: t,
                model : db.Products,
                mapToModel: true ,
            })
    
    
            await t.commit();
            return res.status(201).send(product);
        }


    } catch (error) {
        await t.rollback();
        return res.status(500).send({
            message: "database error",
          })
    }
  }

  // delete product
  async deleteProduct(req, res) {
    const productId = req.params.productId
    if (productId) {
        try {
            const product = await db.Products.update({
                deleteFlg: 1
            },{
                where: {
                    id: productId,
                    deleteFlg: 0
                }
            })

            if (product[0] === 0) {
                return res.status(404).send({
                    message: 'productId not found'})
            }

            return res.status(200).send({
                message: 'delete success'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: 'database error'
            })
        }

    }
    return res.status(200).send({
        message: 'have no productId'
    })

  }

  // add review
  async postReview(req, res) {
    const t = await db.sequelize.transaction();
    const body = req.body;
    const userId = req.userId.data

    console.log(body.productId);

    try {
        const review = await db.Review.findOne({
            where: {
                productId: body.productId,
                userId: userId
            }
        })


        if (review) {
            await db.Review.update({
                comment: body.comment,
                rate: body.rate
            },{
                where: {
                    productId: body.productId,
                    userId: userId,
                }
            }, {
                transaction: t
            })

            const avgStar = await db.Review.findOne({
                attributes: [
                    [db.Sequelize.fn('AVG', db.Sequelize.col('rate')), 'avgRating'],
                    [db.Sequelize.fn('COUNT', db.Sequelize.col('rate')), 'sumRating']
                ],
                group: 'productId',
                where: {
                    productId: body.productId,
                },
            })
            await db.Products.update({
                averageRating: avgStar.dataValues.avgRating,
                numberRating: avgStar.dataValues.sumRating,
            },{
                where: {
                    id: body.productId,
                }
            }, {
                transaction: t
            })

            await t.commit();
            return res.status(200).send({
                message: 'update success'
            });
        } else {
            const a = await db.Review.create({
                productId: body.productId,
                userId: userId,
                comment: body.comment,
                rate: body.rate
            })

            console.log(a);

            const avgStar = await db.Review.findOne({
                attributes: [
                    [db.Sequelize.fn('AVG', db.Sequelize.col('rate')), 'avgRating'],
                    [db.Sequelize.fn('COUNT', db.Sequelize.col('rate')), 'sumRating']
                ],
                group: 'productId',
                where: {
                    productId: body.productId,
                },
            })

            await db.Products.update({
                averageRating: avgStar.dataValues.avgRating,
                numberRating: avgStar.dataValues.sumRating,
            },{
                where: {
                    id: body.productId,
                }
            })

            await t.commit();
            console.log('return');
            return res.status(201).send({
                message: 'create success'
            });
        }
        
    } catch (error) {
        console.log(error);
        await t.rollback();
        return res.status(500).send({
            message: "database error",
          })
    }

  }

  async getReview(req, res) {
    console.log(req);

    try {
        const review = await db.Review.findOne({
            where: {
                productId: req.query.productId,
                userId: req.userId.data
            }
        })

        return res.status(200).send({
            review: review
        })
        
    } catch (error) {
        return res.status(500).send({
            message: "database error",
          })
    }
  }
}

module.exports = new Private
