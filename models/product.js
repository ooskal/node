const db = require("../util/database");

module.exports = class Product {
  constructor(title, imageUrl, price) {
    this.title = title;
    this.price = price;
  }

  save() {
    db.execute("INSERT INTO book (title, price) VALUES");
  }

  static deleteById(id) {}

  static fetchAll(cb) {
    return db.execute("SELECT * FROM book");
  }

  static findById(id) {}
};
