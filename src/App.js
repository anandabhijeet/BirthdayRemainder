import React from "react";
import Card from "./Card";
import { Grid } from "@mui/material";
import "./App.css";

const App = () => {
  //const [people, setPeople] = useState(data);
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Card />
    </Grid>
  );
};

export default App;
