import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
//import Header from './component/Header'
import Replica from './component/Replica'
import Estatistica from './component/Estatistica'
import Usuarios from './component/Usuarios'
import logo from './img/logo-karyon.png'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  },
  button: {
    color: 'white'
  }
}));

const desLogar = () => {
  localStorage.removeItem('token')
}

function App() {
  const classes = useStyles();
  return (
    <div id="root">
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="Logo Karyon" />
          <Grid container direction="row" justify="center" alignItems="center">
            <Link to="/replica" className={classes.link}><Button className={classes.button}>Painel de Réplica</Button></Link>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Link to="/estatistica" className={classes.link}><Button className={classes.button}>Estatística</Button></Link>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Link to="/usuarios" className={classes.link}><Button className={classes.button}>Usuários</Button></Link>
          </Grid>
          <Link to="/login" className={classes.link}><Button className={classes.button} onClick={desLogar}>Sair</Button></Link>
        </Toolbar>
      </AppBar>
      <div className="main">
        <Switch>
          <Route path="/replica" ><Replica /></Route>
          <Route path="/estatistica" ><Estatistica /></Route>
          <Route path="/usuarios" ><Usuarios /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
