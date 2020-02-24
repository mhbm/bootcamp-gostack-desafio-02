/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    return res.json({
      token: jwt.sign({ id: '1' }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
