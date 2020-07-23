import React, { useCallback } from "react";
import {
  TextField,
  Button,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  setToken,
  fetchGetPosts,
  fetchGetUsers,
  setActiveTab,
} from "./actions";
import Lists from "../../ui/Lists";
import { setCard } from "../Card/actions";

const Home = () => {
  const token = useSelector((state) => state.homeReducer.token);
  const users = useSelector((state) => state.homeReducer.users);
  const posts = useSelector((state) => state.homeReducer.posts);
  const fetch = useSelector((state) => state.homeReducer.fetch);
  const activeTab = useSelector((state) => state.homeReducer.activeTab);

  const dispatch = useDispatch();

  const handlerGetData = useCallback(() => {
    handlerGetPosts();
    handlerGetUsers();
  });

  const handlerGetPostOrUsers = useCallback((e, p = 0) => {
    if (activeTab === "users") {
      handlerGetUsers(p);
    } else {
      handlerGetPosts(p);
    }
  });

  const handlerGetPosts = useCallback((p = 0) => {
    dispatch(fetchGetPosts(p));
  });

  const handlerGetUsers = useCallback((p = 0) => {
    dispatch(fetchGetUsers(p));
  });

  const handlerSetToken = useCallback((e) => {
    dispatch(setToken(e.target.value));
  });

  const handlerSetCard = useCallback((e, data) => {
    dispatch(setCard(data));
  });

  const controls = (
    <div>
      {users && (
        <Button onClick={() => dispatch(setActiveTab("users"))}>
          Пользователи
        </Button>
      )}
      {posts && (
        <Button onClick={() => dispatch(setActiveTab("posts"))}>Посты</Button>
      )}
    </div>
  );

  // Наименования заголовков для Users и ключи доступа к данным
  const tableUsers = {
    headersName: ["Фамилия", "Имя", "Email"],
    keyValue: ["last_name", "first_name", "email"],
  };
  // Наименование заголовков для Posts и ключи
  const tablePosts = {
    headersName: ["ID", "Наименование"],
    keyValue: ["id", "title"],
  };
  return (
    <div style={{ textAlign: "center" }}>
      <TextField
        label="Введите Access Token"
        variant="outlined"
        value={token}
        onChange={handlerSetToken}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlerGetData}
        disabled={!token}
        style={{ margin: "10px 0 0 30px" }}
      >
        Применить
      </Button>
      <Toolbar />
      {/* Есть запрос ? Показываем циркулярку */}
      {fetch && (
        <CircularProgress
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {controls}

      {activeTab && (
        <Lists
          data={activeTab == "users" ? users : posts}
          table={activeTab == "users" ? tableUsers : tablePosts}
          onChangePage={handlerGetPostOrUsers}
          onClickRow={handlerSetCard}
          toRedirect="/card"
        />
      )}
    </div>
  );
};

export default Home;
