const Sequelize = require("sequelize");
//my sql 연동정보와 테이블 정보를담음
const sequelize = require("../util/database");
//회원
const User = sequelize.define("user", {
  user_num: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_pw: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
