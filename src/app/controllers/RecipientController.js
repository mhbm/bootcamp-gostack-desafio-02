/* eslint-disable class-methods-use-this */
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    try {
      const recipientExist = await Recipient.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (recipientExist) {
        return res.status(400).json({ error: 'Recipient already exist' });
      }

      const recipientCreated = await Recipient.create(req.body);

      return res.status(201).json(recipientCreated);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async update(req, res) {}

  async index(req, res) {}

  async show(req, res) {}

  async delete(req, res) {}
}

export default new RecipientController();
