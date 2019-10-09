import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

// Import the reducers
import Reducers from "./Reducers/index";

const Logger = createLogger();
const Store = createStore(Reducers, applyMiddleware(Logger, promiseMiddleware));

export default Store;
