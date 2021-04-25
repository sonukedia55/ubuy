import React from "react";
import { Link } from "react-router-dom";
import { loggedUser } from "../../modal/user";
import styles from "./home.scss";

class Header extends React.Component {
  constructor(props) {
      super(props)
      console.log(props)
  }

  setLoggout(){
    this.props.setUser("","logout")
  }

  render() {
    return (
      <div className={styles["header"]}>
        <div className={[styles["headersection"], styles["title"]].join(" ")}>
          <Link to="/ubuy/dist">UBuy</Link>
        </div>
        <div className={styles["headersection"]}>
            {this.props.user ? <div onClick={this.setLoggout.bind(this)}>{this.props.user.username}</div> : <div onClick={this.props.openDialog.bind(this)}>Login</div>}
            {this.props.user ? <div><Link to="/ubuy/dist/orders">ORDERS</Link></div> : ''}
            {this.props.user ? <div><Link className={styles['acart']} to="/ubuy/dist/cart"><img src="https://raw.githubusercontent.com/sonukedia55/ubuy/main/public/shopping_cart.svg"/> CART</Link></div> : ''}
        </div>
      </div>
    );
  }
}

export default Header;
