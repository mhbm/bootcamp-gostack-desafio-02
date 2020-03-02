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

  async update(req, res) {
    try {
      const { id } = req.params;

      console.log(req.body);

      await Recipient.update(req.body, {
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'Recipient was updated.',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }

  async index(req, res) {
    return res.status(200).json(await Recipient.findAll());
  }

  async show(req, res) {
    const { id } = req.params;

    const recipientExist = await Recipient.findByPk(id);

    if (!recipientExist) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }
    return res.status(200).json(recipientExist);
  }

  async delete(req, res) {
    try {
      const recipientDelete = await Recipient.destroy({
        where: {
          name: req.body.name,
        },
      });

      if (recipientDelete === 0) {
        return res.status(400).json({
          error: 'Recipient does not exist!',
        });
      }

      return res.status(200).json({
        message: 'Recipient deleted.',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new RecipientController();
