import React from "react";
import { Link, Router, BrowserRouter, Route, Switch } from "react-router-dom";
import { getProductAll } from "../../modal/product";
import Product from "../product/product";
import styles from "./home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      products: [],
    };
  }
  productForeach(product) {
    return (
      <Link
        to={"/ubuy/dist/product/" + product.slug}
        className={styles["producteach"]}
        key={product.id}
      >
        <div>
          <div className={styles["imgdiv"]}>
            <img src={product.url} />
          </div>
          <div className={styles["title"]}>
            <b>{product.title}</b>
          </div>
          <div className={styles["rating"]}>Rs: {product.price}</div>
        </div>
      </Link>
    );
  }
  loadProducts() {
    return (
      <div className={styles["products"]}>
        {/* <div className={styles['classify']}>
          <div>All</div>
          <div>Soe</div>
          <div>Soap</div>
        </div> */}
        {this.state.products.map(this.productForeach)}
      </div>
    );
  }
  componentDidMount() {
    getProductAll().then((products) => {
      console.log(products, "pds");
      this.setState({ products: products });
    });
  }
  render() {
    return <div className={styles["home"]}>{this.loadProducts()}</div>;
  }
}

export default Home;
