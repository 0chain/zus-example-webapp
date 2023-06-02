import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { App as MainApp } from "components/App/App";
import AppWrapper from "components/app-wrapper";

import { store, persistor } from "store";

import "../src/styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <MainApp>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </PersistGate>
      </Provider>
    </MainApp>
  );
}
