import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createMuiTheme,responsiveFontSizes,ThemeProvider} from '@material-ui/core/styles';
  



const style = {
    root: {
      minWidth: 275,
      backgroundColor:'#212121',
      marginTop: 20,
      height: 200,
      color: '#e0f7fa',
      width: 950,
      
    },
    title: {
      fontSize: 20,
      textAlign:'center'
    },
}
     let theme = createMuiTheme();
     theme = responsiveFontSizes(theme);

function Container(props) {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={3}/>
          <Grid item xs={6}>
            <Paper variant="outlined" style={{margin:20,marginTop:100,borderRadius:50}}  >
              <Card className={style.root} variant="outlined" style={{backgroundColor:'black'}}>
                <CardContent>
                  <Typography variant="overline" display="block" className={style.title} gutterBottom style={{color:'white'}}>
                    {props.content}
                  </Typography>
                  <div style={{color:'white'}}>
                     <ThemeProvider theme={theme}>
                      <Typography variant="h2">Welcome to Book Shop</Typography>
                        <Typography variant="h6">Good friends,good books,and a sleepy conscience: this is the ideal life.</Typography>
                         <Typography variant="h6">Kirubajini</Typography>
                         </ThemeProvider>
                    
                  </div>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={3}/>
        </Grid>
      </React.Fragment>
    )
}

export default Container