import React from "react";
import { getProduct } from "../../modal/product";
import styles from "../cart/cart.scss";
import { getUserOrders } from "../../modal/user";

class Order extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      orders: [],
      total: 0,
    };
  }
  componentDidMount() {
    if (this.props.user) {
      console.log("userlogged", this.props.user.cart);
      getUserOrders(this.props.user.id).then((orderList) => {
        if (orderList.length) {
          let prod_map = {},
            cartL = [],
            orders = [],
            total = 0;
          orderList.forEach((i) => {
            i.items.forEach((it) => {
              orders.push({
                oid: i.id,
                pid: it[0],
                ppiece: it[1],
                pcost: it[2],
              });
              total += it[2];
              if (!cartL.includes(it[0])) cartL.push(it[0]);
            });
          });
          if (cartL.length) {
            getProduct("id", cartL).then((resp) => {
              resp.forEach((j) => {
                prod_map[j.id] = j;
              });
              orders.forEach((o, i) => {
                orders[i].prod = prod_map[o.pid];
              });
              this.setState({ orders: orders, total: total });
            });
          }
        }
      });
    }
  }
  cartForEach(item) {
    return (
      <div className={styles["itemo"]} key={item.oid+"_"+item.pid}>
        <img src={item.prod.url} />
        <div className={styles["item"]}>
          <h4>{item.prod.title}</h4>
          <div className={styles["itemprice"]}>
            <b>Rs {item.pcost} &nbsp; Quantity: {item.ppiece}</b>
            <div className={styles["itempiece"]}>
              Order #{item.oid}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={styles["cartmain"]}>
        <div className={styles["cart"]}>
          <h3>My Orders</h3>
          <div className={styles["cartall"]}>
            {this.state.orders.map(this.cartForEach)}
          </div>
        </div>
        <div className={styles["cartbill"]}>
          <b>Total : Rs {this.state.total}</b>
        </div>
      </div>
    );
  }
}

export default Order;
