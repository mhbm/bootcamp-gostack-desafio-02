/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    console.log('bbbb');
    const userRegister = await User.findOne({
      where: {
        email,
      },
    });
    if (!userRegister) {
      return res.status(401).json({
        error: 'User not found',
      });
    }
    if (!(await userRegister.checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }
    console.log('aaaa');
    console.log(userRegister);
    const { id, name } = userRegister;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
