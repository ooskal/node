const Sequelize = require("sequelize");
//my sql 연동정보와 테이블 정보를담음
const sequelize = require("../util/database");

//테이블 정의
//책
const Book = sequelize.define("book", {
  book_num: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//카트
const Cart = sequelize.define("cart", {
  cart_num: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_date: Sequelize.STRING,
});

//주소
const Address = sequelize.define("address", {
  address_num: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  address_line1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address_line2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//카드
const Card = sequelize.define("card", {
  card_num: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  card_period: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

//주문
const Order = sequelize.define("order", {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  order_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  order_total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  card_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  card_num: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  card_period: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  address_num: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address_line1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address_line2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//주문목록
const Order_list = sequelize.define("order_list", {
  order_amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = { Book, Cart, Order, Order_list, Card, Address };
