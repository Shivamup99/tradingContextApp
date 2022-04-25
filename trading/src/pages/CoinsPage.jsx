import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { SingleCoin } from '../context/apiData'
import { CryptoState } from '../context/Context'
import CoinChart from '../components/CoinChart'
import ReactHtmlParser from 'react-html-parser'
//import { numberWithCommas } from '../extraFun/commaFun'
const useStyles = makeStyles((theme)=>({
  container:{
    display:'flex',
    [theme.breakpoints.down('md')]:{
      flexDirection:'column',
      alignItems:'center'
    }
  },
  sidebar:{
    width:'33%',
    [theme.breakpoints.down('md')]:{
      width:'100%'
    },
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:25,
    borderRight:'2px solid grey'
  },
  heading1:{
    fontWeight:'bold',
    marginBottom:20,
    letterSpacing:2
  },
  desc:{
    width:'100%',
    padding:15,
    paddingTop:0,
    paddingBottom:15,
    textAlign:'justify',
    fontSize:'14px',
    color:'grey'
  },
  marketData:{
    alignSelf:'start',
    padding:25,
    paddingTop:10,
    width:'100%',
    [theme.breakpoints.down('md')]:{
      display:'flex',
      justifyContent:'space-around'
    },
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column',
      alignItems:'center'
    },
    [theme.breakpoints.down('xs')]:{
      alignItems:'start'
    }
  },
  heading:{
    fontSize:'20px',
    marginRight:'10px',
    fontWeight:'bold',
    letterSpacing:2,
    color:'darkgray'
  }

}))

function CoinsPage() {
  const classes = useStyles();
  const {id} = useParams();
  const [coinData,setCoinData] = useState()
  const {currency,symbol} = CryptoState()
   
  useEffect(()=>{
    fetchCoinData()
  },[])

  const fetchCoinData = async()=>{
    const {data} = await axios.get(SingleCoin(id))
    setCoinData(data)
  }
 // console.log(coinData)
 if(!coinData) {<LinearProgress color='secondary'/>}
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
      <img src={coinData?.image.large} alt={coinData?.id} height='200'
       style={{marginBottom:20}}/>
       <Typography variant='h3' className={classes.heading1}>
         {coinData?.name}
         </Typography>
         <Typography variant='subtitle1' className={classes.desc}>
           {ReactHtmlParser(coinData?.description.en.split('.')[0])}.
           </Typography>
           <div className={classes.marketData}>
             <span style={{display:'flex'}}>
               <Typography variant='h5' className={classes.heading}>
                 Rank :
                 </Typography>
                 &nbsp; 
                 <Typography variant='h6'>
                 {coinData?.market_cap_rank}
                   </Typography>
               </span>
               <span style={{display:'flex'}}>
               <Typography variant='h5' className={classes.heading}>
                 Current Price :
                 </Typography>
                 &nbsp;
                 <Typography variant='h6'>
                 {symbol}{' '}
                 {coinData?.market_data.current_price[currency.toLowerCase()]}
                   </Typography>
               </span>
               <span style={{display:'flex'}}>
               <Typography variant='h5' className={classes.heading}>
                 Market Capital :
                 </Typography>
                 &nbsp;
                 <Typography variant='h6'>
                 {symbol}{' '}
                 {coinData?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-8)} B
                   </Typography>
               </span>
             </div>
        </div>
        <CoinChart coinData={coinData}/>
      </div>
  )
}

export default CoinsPage