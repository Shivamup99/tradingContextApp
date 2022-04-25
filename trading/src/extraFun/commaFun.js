export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

export const responsive ={
  0:{
    items:2
  },
  512:{
    items:4
  }
}

export const tableRow =['Coin','Price','24h% Change','Market Cap']