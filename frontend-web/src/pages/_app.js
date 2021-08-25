import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import "./../scss/main.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { Layout } from "../components";

const progress = new ProgressBar({
  size: 2,
  color: "#0581c9",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

// const makeStore = () => store;
// const wrapper = createWrapper(makeStore);

// export default wrapper.withRedux(MyApp);

export default MyApp;
