import { render, screen, act } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/redux/store";

test("renders app", async () => {
  // Wrap the render call in act
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });
});
