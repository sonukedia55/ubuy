"use strict";
import { postData, getData } from "../utils/api";

const getUserOrders = (uid) => {
  return getData(`orders?uid=${uid}&_sort=id&_order=desc`);
};

const loggedUser = (val) => {
  if(val){
    localStorage.setItem("userlogged",val)
  }else{
    return localStorage.getItem("userlogged");
  }
  return
};

const logOutUser = () => {
  localStorage.removeItem("userlogged")
}


const addUserOrder = (user, cart) => {
  return new Promise((resolve) => {
    if (user.id && cart.length) {
      let cartN = [];
      console.log(cart, "thiscart");
      cart.forEach((i) => {
        cartN.push({'0':i.id,'1':i.piece,'2':i.price});
      });
      console.log(cartN, "cN");
      user.cart = [];
      updateUser(user.id, user).then((upuser) => {
        const order = {
          id: new Date().getTime(),
          uid: user.id,
          status: 1,
          items: cartN,
        };
        postData(`orders`, order).then((po) => {
          resolve(po);
        });
      });
    } else {
      resolve("None");
    }
  });
};

const getUser = (field, value) => {
  return getData(`user?${field}=${value}`);
};

const updateUser = (uid, data) => {
  if(data._id){
    return postData(`user`, data, uid,data._id);
  }
  return postData(`user`, data, uid);
};

const updateItemToCart = (uid, product, piece) => {
  return new Promise((resolve) => {
    getUser("id", uid).then((user) => {
      if (user.length) {
        let cartItems = user[0].cart,
          found = 0;
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i][0] == product) {
            cartItems[i][1] = piece;
            found = 1;
          }
        }
        if (!found) {
          cartItems.push({'0':product, '1':piece});
        }
        user[0].cart = cartItems;
        updateUser(uid, user[0]).then((resp1) => {
          resolve(resp1);
        });
        // resolve();
      }
    });
  });
};

export {
  getUserOrders,
  getUser,
  updateItemToCart,
  addUserOrder,
  loggedUser,
  logOutUser
};
