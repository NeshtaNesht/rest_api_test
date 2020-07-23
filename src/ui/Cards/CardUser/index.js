import React from "react";
import {
  Paper,
  Typography,
  makeStyles,
  CircularProgress,
  List,
  ListItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const CardUser = ({ activeCard, fetch, userPosts }) => {
  return (
    <>
      <Typography variant="h4">
        {`${activeCard.first_name} ${activeCard.last_name}`}
      </Typography>
      <Typography>
        <b>Пол:</b> {activeCard.gender}
      </Typography>
      <Typography>
        <b>Адрес:</b> {activeCard.address}
      </Typography>
      <Typography>
        <b>E-mail:</b> {activeCard.email}
      </Typography>
      <Typography>
        <b>Дата рождения:</b> {activeCard.dob}
      </Typography>
      <Typography>
        <b>Телефон:</b> {activeCard.phone}
      </Typography>
      <b>Посты пользователя:</b>
      <br />
      {fetch ? (
        <CircularProgress />
      ) : (
        <List>
          {userPosts.map((v, k) => {
            return (
              <Link key={k} to="/">
                <ListItem>{v.title}</ListItem>
              </Link>
            );
          })}
        </List>
      )}
    </>
  );
};
export default CardUser;
