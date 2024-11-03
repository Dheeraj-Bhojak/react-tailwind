import { legacy_createStore as createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { RootReducer } from "../utils/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWares = [thunk as ThunkMiddleware];

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export const persister = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
