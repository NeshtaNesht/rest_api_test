import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  makeStyles,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

/**
 * Карточка постов
 * @param {object} activeCard Активная карточка
 * @param {bool} fetch Флаг запроса
 * @param {Array of objects} comments Массив объектов с комментариями
 */
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

CardPost.propTypes = {
  activeCard: PropTypes.object,
  fetch: PropTypes.bool,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      post_id: PropTypes.string,
      _links: PropTypes.object,
    })
  ),
};

export default CardPost;
