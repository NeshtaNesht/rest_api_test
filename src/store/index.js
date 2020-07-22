import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const storage = "restapi_test";

// Сохранение стейта в localstorage
const saveState = (state) => {
  try {
    const stateToSave = JSON.stringify(state);
    localStorage.setItem(storage, stateToSave);
  } catch (e) {
    console.log(e);
  }
};

// Загрузка стейта из localstorage
const loadState = () => {
  try {
    // Получаем стейт по ключу из loaclstorage
    const s = localStorage.getItem(storage);
    if (!s) return undefined;
    // Парсим объект в нормальный вид
    return JSON.parse(s);
  } catch (e) {
    console.log(e);
  }
};

const prevState = loadState();

const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  //prevState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// Вызываем сохранение стейта в localStorage каждый раз, когда стейт обновляется
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
