/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import User from '../models/User';

class RecipientController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          error: 'Validations fails!',
        });
      }
      const userExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (userExist) {
        return res.status(400).json({ error: 'User already exist' });
      }

      console.log('aaaa');
      const userCreated = await User.create(req.body);

      return res.status(201).json(userCreated);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassworld', (oldPassword, field) => {
            return oldPassword ? field.required() : field;
          }),
        confirmPassword: Yup.string().when('password', (password, field) => {
          return password
            ? field.required().oneOf([Yup.ref('password')])
            : field;
        }),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validations fails' });
      }

      const { email, oldPassword } = req.body;

      console.log(req.userId);

      const user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).json({ error: 'User already register!' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match!' });
      }

      const { id, name, provider } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
        provider,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }

  async index(req, res) {
    return res.status(200).json(await User.findAll());
  }

  async show(req, res) {
    const { id } = req.params;

    const userExist = await User.findByPk(id);

    if (!userExist) {
      return res.status(400).json({ error: 'User does not exists.' });
    }
    return res.status(200).json(userExist);
  }

  async delete(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          error: 'Validations fails!',
        });
      }
      const userDelete = await User.destroy({
        where: {
          name: req.body.name,
        },
      });

      if (userDelete === 0) {
        return res.status(400).json({
          error: 'User does not exist!',
        });
      }

      return res.status(200).json({
        message: 'User deleted.',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new RecipientController();
