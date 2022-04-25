import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Scroller from './Scroller'

const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage:'url(https://www.cnet.com/a/img/resize/78e7025e260353f4837380dd5a0b88b851b35545/2021/12/27/08396450-7e0f-4515-a7ee-6c4cae5345a8/gettyimages-1325823070.jpg?auto=webp&fit=crop&height=630&width=1200)',
        backgroundSize:'100%'
    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around'
    },
    tag:{
       textAlign:'center',
       height:'40%',
       justifyContent:'center',
        //display:'flex',
        // flexDirection:'column'
    },
    bannerFh2:{
       marginBottom:15,
       fontWeight:800,
       letterSpacing:2,
       color:'black'

    }
}))
function Banner() {
    const classes = useStyles()
  return (

    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tag}>
            <Typography variant='h2' className={classes.bannerFh2}>Trading Hub</Typography>

              <Typography variant='subtitle2' style={{color:'darkgrey',textTransform:'capitalize',letterSpacing:'3px',lineHeight:'2px'}}>Get all the info about trading marcket</Typography>
                </div>
                <Scroller/>
            </Container>

        </div>
  )
}

export default Banner