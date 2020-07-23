import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  href: {
    textDecoration: "none",
  },
});

/**
 * Карточка пользователя
 * @param {object} activeCard Карточка
 * @param {bool} fetch Флаг запроса
 * @param {Array of objects} userPosts Массив постов пользователя
 * @param {string} toPostRedirect Ссылка куда переходить по нажатию на пост
 * @param {func} onLinkClick Обработчик нажатия на пост
 */
const CardUser = ({
  activeCard,
  fetch,
  userPosts,
  toPostRedirect,
  onLinkClick,
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">
        <Avatar src={activeCard._links.avatar.href} />
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
        <ul>
          {userPosts.map((v, k) => {
            return (
              <Link
                key={k}
                to={toPostRedirect}
                onClick={() => onLinkClick(v)}
                className={classes.href}
              >
                <li style={{ padding: 10, fontSize: 18 }}>{v.title}</li>
              </Link>
            );
          })}
        </ul>
      )}
    </>
  );
};

CardUser.propTypes = {
  activeCard: PropTypes.object,
  fetch: PropTypes.bool,
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
      user_id: PropTypes.string,
      _links: PropTypes.object,
    })
  ),
  toPostRedirect: PropTypes.string,
  onLinkClick: PropTypes.func,
};
export default CardUser;
