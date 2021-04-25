import React from "react";
import { getProduct } from "../../modal/product";
import { addUserOrder } from "../../modal/user";
import styles from "./cart.scss";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      bag: [],
      total : 0
    };
  }
  componentDidMount(){
      if(this.props.user){
          console.log("userlogged",this.props.user.cart)
          const cartlist = this.props.user.cart
          let cart_map = [],cartL = []
          cartlist.forEach(i => {
              cart_map[i[0]] = i[1]
              cartL.push(i[0])
          });
          if(cartL.length){
              getProduct("id",cartL).then(resp=>{
                  let total = 0
                  resp.forEach((j,i)=>{
                      resp[i]['piece'] = cart_map[j.id]
                      total+=(j.price * parseInt(cart_map[j.id]))
                  })
                this.setState({bag:resp,total:total})
              })
          }
      }
  }
  checkOutCart(){
    if(this.props.user){
      const uid = this.props.user.id
      if(uid){
        if(this.props.user.cart.length){
          addUserOrder(this.props.user,this.state.bag).then(resp=>{
            console.log(resp,"out")
            alert("Successfully checked out!")
            this.setState({bag:[],total:0})
          })
        }
      }
    }
  }
  cartForEach(item){
    return <div className={styles["itemo"]} key={item.id}>
    <img src={item.url} />
    <div className={styles["item"]}>
      <h4>{item.title}</h4>
      <div className={styles["itemprice"]}>
        <b>Rs {item.piece * item.price}</b>
        <div className={styles["itempiece"]}>
          <button>Remove</button>
          <p className={styles['b1']}>-</p> <p>{item.piece}</p> <p className={styles['b1']}>+</p>
        </div>
      </div>
    </div>
  </div>
  }
  render() {
    return (
      <div className={styles["cartmain"]}>
        <div className={styles["cart"]}>
          <h3>My Cart</h3>
          <div className={styles["cartall"]}>
            {
              (this.state.bag.length)
              ? this.state.bag.map(this.cartForEach)
              : <p>Your cart is empty!</p>
            }
          </div>
        </div>
        <div className={styles["cartbill"]}>
          <b>Total : Rs {this.state.total}</b>
          <button onClick={this.checkOutCart.bind(this)}>Checkout</button>
        </div>
      </div>
    );
  }
}

export default Cart;
