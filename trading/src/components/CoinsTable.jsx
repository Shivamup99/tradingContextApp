import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../context/apiData";
import { CryptoState } from "../context/Context";
import { theme } from "../extraFun/pageTheme";
import { numberWithCommas, tableRow } from "../extraFun/commaFun";
import { useNavigate } from "react-router-dom";
import {Pagination} from '@material-ui/lab'
const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    // pagen:{
    //    "&.MuiPaginationItem-root":{
    //        color:'goldenrod',
    //    }
    // }
  }
}));

function CoinsTable() {
  const classes = useStyles();
  let navigate = useNavigate();

  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination,setPagination] = useState(1)
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  // console.log(coins)
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center", width: "80%" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Trading Prices by Market Capital
        </Typography>
        <TextField
          label="search for tradimg coins ......"
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
            textTransform: "capitalize",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {tableRow.map((head, index) => (
                  <TableCell
                    style={{ color: "black", fontWeight: 700 }}
                    key={index}
                    // align={head==='Coin'?'':'right'}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch().slice((pagination-1)*10,(pagination-1)*10+10).map((row) => {
                const profit = row.price_change_percentage_24h >= 0;
                // console.log('this is row',row)
                return (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex", gap: 15 }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{ textTransform: "uppercase", fontSize: 20 }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>

                    <TableCell
                      style={{
                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}{" "}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    <TableCell>
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap.toString().slice(0, -8))}{" "}
                      B
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <Pagination style={{padding:20,width:'100%',display:'flex',justifyContent:'center'}}
        count={(handleSearch()?.length/10).toFixed(0)}
        // classes={{ul:classes.pagen}}
        onChange={(_,value)=>{
            setPagination(value);
            window.scroll(0,450)
        }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
