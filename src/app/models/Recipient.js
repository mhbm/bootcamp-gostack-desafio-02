import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.INTEGER,
        state: Sequelize.CHAR(2),
        city: Sequelize.STRING,
        cep: Sequelize.INTEGER,
        complement: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
