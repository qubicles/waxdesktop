import * as types from "../actions/types";

const initialState = [
  {
    name: "WAX",
    quant: "1,468,932.12",
    price: "$5894.45",
    img: "ScrollGroup6.png"
  },
  {
    name: "WAX",
    quant: "21,372,829.11",
    price: "$4722.86",
    img: "ScrollGroup7.png"
  },
  {
    name: "WAX",
    quant: "1,468,932.12",
    price: "$2,204.33",
    img: "ScrollGroup8.png"
  },
  {
    name: "WAX",
    quant: "1,468,932.12",
    price: "$921.93",
    img: "ScrollGroup9.png"
  }
]

export default function wallet(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
