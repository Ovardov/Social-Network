import { createStore, Store as Store_ } from 'redux';
import rootReducer from './reducers';

export type AppState = ReturnType<typeof rootReducer>;

const store: Store_<AppState> = createStore(
  rootReducer,
  global.window?.__REDUX_DEVTOOLS_EXTENSION__ && global.window?.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;