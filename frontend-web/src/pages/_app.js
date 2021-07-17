import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import "./../scss/main.scss";
import Layout from "../components/Layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
