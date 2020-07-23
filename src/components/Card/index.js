import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsByUser, fetchCommentsByPost, setCard } from "./actions";
import { setActiveTab } from "../Home/actions";
import { Paper, makeStyles } from "@material-ui/core";
import CardUser from "../../ui/Cards/CardUser";
import CardPost from "../../ui/Cards/CardPost";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

const Card = () => {
  const activeCard = useSelector((state) => state.cardReducer.activeCard);
  const activeTab = useSelector((state) => state.homeReducer.activeTab);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === "users") {
      dispatch(fetchPostsByUser());
    } else if (activeTab === "posts") {
      dispatch(fetchCommentsByPost());
    }
  }, [activeTab]);

  const userPosts = useSelector((state) => state.cardReducer.userPosts);
  const postComments = useSelector((state) => state.cardReducer.postComments);
  const fetch = useSelector((state) => state.cardReducer.fetch);

  const handlerLinkClicked = useCallback((l) => {
    dispatch(setActiveTab("posts"));
    dispatch(setCard(l));
  });

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {activeTab === "users" ? (
        <CardUser
          activeCard={activeCard}
          fetch={fetch}
          userPosts={userPosts}
          toPostRedirect={"/card"}
          onLinkClick={handlerLinkClicked}
        />
      ) : (
        <CardPost
          activeCard={activeCard}
          fetch={fetch}
          comments={postComments}
        />
      )}
    </Paper>
  );
};

export default Card;
