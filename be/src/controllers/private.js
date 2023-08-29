const db = require('../models')

class Private {
  // post product
  async postProducts(req, res) {

    let name = req.query.name;
    let element = req.query.element;

    console.log(name);

    try {

        
        return res.status(200).send(products);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "database error",
          })
    }
  }
}

module.exports = new Private
