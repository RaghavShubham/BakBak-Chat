import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: 50,
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "70vh",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "70vh",
    padding: 20,
  },
  chatbox: {
    width: "85%",
  },
  send: {
    width: "15%",
  },
}));

export default function Dashboard() {

  const [allChats] = React.useContext(Context);
  
  const topics = Object.keys(allChats);
    
  const classes = useStyles();

  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [text, changeText] = useState('');

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          BakBak Chat
        </Typography>
        <Typography component="h5">{activeTopic}</Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map((topic) => (
                <ListItem onClick={e => changeActiveTopic(e.target.innerText)} button key={topic}>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex}>
                <Chip variant="outlined" size="small" label={chat.from} />
                <Typography variant="p">{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
            <TextField
              className={classes.chatbox}
              label="Type a message..."
              multiline
              rowsMax={4}
              value={text}
              onChange={e => changeText(e.target.value)}
            />
            <Button variant="outlined" color="primary">
              Send
            </Button>
        </div>
      </Paper>
    </div>
  );
}
