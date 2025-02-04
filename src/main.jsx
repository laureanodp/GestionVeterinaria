import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store             from './store/store';
import App from "./App.jsx";
import { Provider }      from "react-redux";
import { Tema }          from './themes/tema';


createRoot(document.getElementById("root")).render(
   <StrictMode>
   <Provider store={store}>
    <BrowserRouter>
    <Tema>
      <App />
    </Tema>
    </BrowserRouter>
   </Provider>
  </StrictMode>
);

