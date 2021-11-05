import React, { useState, useCallback } from "react";
import {
  Box,
  Container,
  ListItemAvatar,
  Avatar,
  Grid,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import data from "./Data";
import { v4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const Card = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [people, setPeople] = useState(data);

  const [newData, setNewData] = useState({
    name: "",
    age: "",
    id: v4(),
    date: "",
    image: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setNewData({
      ...newData,
      [e.target.name]: value,
    });
  };

  const handleRequest = (e) => {
    e.preventDefault();

    if (
      newData.name === "" ||
      newData.age === "" ||
      newData.image === "" ||
      newData.date === ""
    ) {
      return alert("Please complete the form");
    }

    console.log(newData);
    setNewData({ name: "", age: "", id: v4(), date: "", image: "" });
    setPeople([...people, newData]);

    handleClose();
  };

  const Row = useCallback(({ index, style }) => {
    const { name, age, date, image } = people[index] || {};

    return (
      <div marginTop={2}>
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemAvatar>
            <Avatar alt={"avatar"} src={image} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    fontSize={13}
                  >
                    {`${age} years`}
                  </Typography>
                  <Typography
                    paddingLeft="5px"
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    fontSize={13}
                  >
                    {`${date}`}
                  </Typography>
                </Grid>
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    );
  });

  return (
    <div>
      <Box
        // height={630}
        width={400}
        boxShadow={10}
        marginTop={5}
        backgroundColor={"white"}
        borderRadius={3}
      >
        <Typography className="card-header" fontSize="25px" variant="h1">
          {`${people.length} Upcoming Birthday`}
        </Typography>

        <Container>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              height={380}
              width={300}
              marginTop={3}
              borderRadius={3}
              boxShadow={3}
              padding={2}
            >
              <FixedSizeList
                height={380}
                width={300}
                itemSize={50}
                itemCount={people.length}
              >
                {Row}
              </FixedSizeList>
            </Box>

            <Box
              width={338}
              height={40}
              marginTop={3}
              backgroundColor={"green"}
              boxShadow={3}
              borderRadius={3}
              textAlign="center"
            >
              <Container>
                <Typography
                  color="white"
                  fontSize={15}
                  marginTop={"10px"}
                  variant={"h1"}
                  onClick={() => setPeople([])}
                >
                  Clear the List
                </Typography>
              </Container>
            </Box>
            <Box
              width={338}
              height={40}
              // marginTop={3}
              marginBottom={3}
              backgroundColor={"deeppink"}
              boxShadow={3}
              borderRadius={3}
              marginTop={"10px"}
              className="add-newButton"
              textAlign="center"
            >
              <Typography
                color="white"
                fontSize={15}
                marginTop={"10px"}
                variant={"h1"}
                onClick={handleOpen}
              >
                Add new Birthday
              </Typography>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box borderRadius={3} height={300} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Whose Birthday is Comming!!!
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newData.name}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            margin="dense"
            name="age"
            label="Age"
            type="text"
            fullWidth
            variant="standard"
            value={newData.age}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="image"
            label="Image url"
            type="text"
            fullWidth
            variant="standard"
            value={newData.image}
            onChange={handleChange}
          />
          <TextField
            paddingBottom="5px"
            autoFocus
            margin="dense"
            name="date"
            label=""
            type="date"
            fullWidth
            variant="standard"
            value={newData.date}
            onChange={handleChange}
          />
          <Button onClick={handleRequest} color="secondary" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Card;
