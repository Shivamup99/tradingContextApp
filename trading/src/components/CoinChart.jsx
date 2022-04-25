import { CircularProgress, ThemeProvider } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../context/apiData'
import { CryptoState } from '../context/Context'
import { theme as themes } from '../extraFun/pageTheme'
import {Line} from 'react-chartjs-2'
//import Chart from 'chart.js/auto'
import { useParams } from 'react-router-dom';
const useStyles = makeStyles((theme)=>({
    container:{
        width:'70%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
        padding:40,
        [theme.breakpoints.down('md')]:{
        width:'100%',
        padding:20,
        marginTop:0,
        paddingTop:0
        }
    }
}))

function CoinChart({coinData}) {
    //const {id} = useParams()
    const classes = useStyles()
    const {currency} = CryptoState()
     const [coinChart,setCoinChart] = useState()
    const [days,setDays] = useState(1)

    const fetchCoinChartData = async()=>{
        const {data} = await axios.get(HistoricalChart(coinData.id,days,currency))
        setCoinChart(data.prices)
       // console.log(data.prices)
    }
    console.log('data',coinChart)
    useEffect(()=>{
        fetchCoinChartData();
    },[currency,days])
  return (
    <ThemeProvider theme={themes}>
        <div className={classes.container}>
            {coinChart ?(
             <>
             <Line  
              data={{
                  labels:coinChart.map((coin)=>{
                      let date= new Date(coin[0]);
                      let time = date.getHours()>12 ?`${date.getHours()-12}:${date.getMinutes()} PM` :`${date.getHours()}:${date.getMinutes()} AM`;
                      return days===1 ? time: date.toLocaleDateString()
                  }),
                  datasets:[{data:coinChart.map((coin)=>coin[1])}]
              }}
              />
             </>
             
            ):(
                <CircularProgress style={{color:'gold'}} size={250} thickness={1}/>
            )}
            </div>
        </ThemeProvider>
  )
}

export default CoinChart