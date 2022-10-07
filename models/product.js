const fs = require("fs");
const path = require("path");
// 데이터 관리는 모델이 함 뷰에 있는 폼을 통해 노드 익스프레스 애플리케이션으로 데이터가 입력되면 모델로 전달해서 저장
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => { //헬퍼함수 보이는 대로 경로 구축하고 파일 읽어옴 103강의
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
