import "react-app-polyfill/stable";
import "core-js";

import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./utils/store";
import { BrowserRouter } from "react-router-dom";
import { SliderBarProvider } from "./utils/context/sidebar.context";
import { FormDataProvider } from "./utils/context/formData/formData.context";
import { AccountManagerProvider } from "./utils/context/formData/accountManager.context";

const container = document.getElementById("root");

const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <SliderBarProvider>
      <FormDataProvider>
        <AccountManagerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AccountManagerProvider>
      </FormDataProvider>
    </SliderBarProvider>
  </Provider>
);
