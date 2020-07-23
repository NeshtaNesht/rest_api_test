import React from "react";
import {
  Paper,
  Typography,
  makeStyles,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const CardPost = ({ activeCard, fetch, comments }) => {
  return (
    <>
      <Typography variant="h4">{`${activeCard.title}`}</Typography>
      <Typography>{activeCard.body}</Typography>
      <b>Комментарии:</b>
      <br />
      {fetch ? (
        <CircularProgress />
      ) : (
        <List>
          {comments.map((v, k) => {
            return (
              <div key={k}>
                <ListItem>
                  <ListItemText>
                    <b>{v.name}</b>
                  </ListItemText>
                  <ListItemText>
                    <b>{v.email}</b>
                  </ListItemText>
                </ListItem>
                <Typography>{v.body}</Typography>
              </div>
            );
          })}
        </List>
      )}
    </>
  );
};
export default CardPost;
