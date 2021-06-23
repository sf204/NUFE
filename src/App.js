import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import axios from "axios";

import "./App.css";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  list: {
    width: 250,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [state, setState] = useState({  
    right: false,
  });
  const classes = useStyles();

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }    
    setState({ right : open });
    console.log('toggleDrawer');
  };
  
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>      
          <ListItem button key={"name"}>
            <ListItemText primary={'countryData.name'} />
          </ListItem>

          <ListItem button key={"capital"}>
            <ListItemText primary={'countryData.capital'} />
          </ListItem>
        
      </List>
      <Divider />
      <List>
        
      <ListItem button key={"region"}>
            <ListItemText primary={'countryData.region'} />
          </ListItem>

          <ListItem button key={"population"}>
            <ListItemText primary={'countryData.population'} />
          </ListItem>

          <ListItem button key={"gini"}>
            <ListItemText primary={'countryData.gini'} />
          </ListItem>
        
      </List>
    </div>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table}  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {console.log(countriesData)}
                {countriesData.map((country) => (
                  <TableRow  key={country.name}>
                    <TableCell component="th" scope="row">
                    <Link href="#" onClick={ toggleDrawer(true,country)} variant="body2">
                    {country.name}  </Link>                    
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                      
                      {console.log(country.flags)}
                    </TableCell>
                    <TableCell align="right">{country.capital === "" ?"NA":country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region === "" ?"NA":country.region}</TableCell>                    
                  </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer(false)}>
                    {list()}
                    </Drawer>
      </Grid>
    </>
  );
}

export default App;
