"use strict";
import { postData, getData } from "../utils/api";

const getProductAll = () => {
  return getData("product");
};

const getProduct = (field, value) => {
  let others = [];
  if (Array.isArray(value)) {
    value.forEach((i) => {
      others.push(`${field}=${i}`);
    });
  } else {
    others.push(`${field}=${value}`);
  }
  return getData(`product?${others.join("&")}`);
};

export { getProductAll, getProduct };
