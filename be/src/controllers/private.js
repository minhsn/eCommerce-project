const db = require('../models')

class Private {
  // post product
  async postProducts(req, res) {

    const t = await db.sequelize.transaction();

    let body = req.body;

    try {
        // const element =  await db.Element.findAll({
        //     include: {
        //         model: db.Products,
        //         attributes: ['name', 'price'],
        //     }
        // })

        const product = await db.Products.create({
            name: body.name,
            price: body.price,
            description: body.description,
            averageRating: body.averageRating,
            numberRating: body.numberRating
        }, { 
            transaction: t,
            model : db.Products,
            mapToModel: true ,
        })


        await t.commit();
        return res.status(200).send(product);

    } catch (error) {
        await t.rollback();
        return res.status(500).send({
            message: "database error",
          })
    }
  }

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
}

module.exports = new Private
