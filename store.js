import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import reducer from "./reducers/questions";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const store = createStore(
  reducer,
  {
    questionsMP: {},
    auditsMP: [],
    questionsM: {},
    auditsM: []
  },
  applyMiddleware(logger)
); 

export { store };
