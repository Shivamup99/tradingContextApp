import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../context/apiData";
import { CryptoState } from "../context/Context";
import { numberWithCommas, responsive } from "../extraFun/commaFun";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  scrollers: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  scrollerItem: {
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fffff",
    textTransform: "uppercase",
    cursor: "pointer",
  },
}));

function Scroller() {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchTrandingCoins();
  }, [currency]);

  const fetchTrandingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  //console.log(trending);

  const items = trending.map((item) => {
    const profit = item.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.scrollerItem} to={`/coins/${item.id}`}>
        <img
          src={item?.image}
          alt={item.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{ color: "white" }}>
          {item?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgba(14,203,129)" : "crimson",
              fontWeight: 600,
            }}
          >
            {profit && "+"} {item.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontWeight: 400, fontSize: 22, color: "white" }}>
          {symbol} {numberWithCommas(item?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.scrollers}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        animationDuration={1500}
        autoPlayInterval={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
}

export default Scroller;
