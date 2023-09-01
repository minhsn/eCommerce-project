const db = require('../models')

class Private {
  // post product
  async postProducts(req, res) {

    const t = await db.sequelize.transaction();

    let body = req.body;

    console.log(body);

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
        if(body.elements) {
            for (const element of Array.from(body.elements)) {
                await db.Element.create({
                    productId: product.id,
                    name: element
                }, {
                    transaction: t
                })
            }
        }


        await t.commit();
        return res.status(200).send(product);

    } catch (error) {
        await t.rollback();
        console.log(error);
        return res.status(500).send({
            message: "database error",
          })
    }
  }
}

module.exports = new Private
