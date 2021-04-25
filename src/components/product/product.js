import React from "react";
import { Link, Router, BrowserRouter } from "react-router-dom";
import { getProduct } from "../../modal/product";
import { updateItemToCart } from "../../modal/user";
import { getStar } from "../../utils/utils";
import styles from "./product.scss";
// import img1 from './star_black.svg'

class Product extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      prod: {},
      isbagged: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.slug) {
      getProduct("slug", this.props.match.params.slug).then((resp) => {
        if (resp.length) {
          let isbagged = this.bagStatus(resp[0].id, this.props.user);
          this.setState({ prod: resp[0], isbagged: isbagged });
        } else {
          alert("No item found!");
        }
      });
    }
  }

  bagStatus(id, user) {
    if (user) {
      let bagged = user.cart;
      for (let i = 0; i < bagged.length; i++) {
        if (bagged[i][0] == id) {
          return true;
        }
      }
    }
    return false;
  }

  addThisCart() {
    if (this.props.user && this.state.prod.id) {
      updateItemToCart(this.props.user.id, this.state.prod.id, 1).then(
        (resp) => {
          console.log(resp, "rep");
          this.props.setUser(this.props.user.username)
        }
      );
    }
  }

  render() {
    return (
      <div className={styles["productmain"]}>
        <div className={styles["left"]}>
          <div className={styles["img"]}>
            <img src={this.state.prod.url ? this.state.prod.url : ""} />
          </div>
          {this.props.user ? (
            <button onClick={this.addThisCart.bind(this)}>
              {this.state.isbagged ? "✔ Added to Cart" : "Add to Cart"}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className={styles["right"]}>
          <h1>
            {this.state.prod.title ? this.state.prod.title : "Loading..."}
          </h1>
          <div className={styles["reviewhead"]}>
            <div className={styles["reviewoverall"]}>
              <img src="https://raw.githubusercontent.com/sonukedia55/ubuy/main/public/star_black.svg" />
            </div>
            <p>{this.state.prod.rating ? this.state.prod.rating : ""}</p>
          </div>
          <div className={styles["price"]}>
            Rs {this.state.prod.price ? this.state.prod.price : "..."}
          </div>
          <div className={styles["desc"]}>
            <h3>Description</h3>
            <p>{this.state.prod.desc ? this.state.prod.desc : ""}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
