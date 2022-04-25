import React from "react";
//import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/Context";
import {theme} from '../extraFun/pageTheme'
function Header() {
  // let navigate = useNavigate()
  const {currency,setCurrency} = CryptoState()
  //console.log(currency)
  

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
       
        <Container>
          <Toolbar>
            <Typography className="title" variant="h4">
              <Link
                to="/"
                style={{ textDecoration: "none", color: "goldenrod" }}
              >
                Trading Cap
              </Link>{" "}
            </Typography>
            <Select
              style={{ width: 100, height: 40, marginRight: 15 }}
              variant="outlined"
              onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
             
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
