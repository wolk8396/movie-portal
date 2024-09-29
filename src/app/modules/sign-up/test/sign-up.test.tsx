import { render, screen, fireEvent } from "@testing-library/react";
import SignUP from "../sign-up";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

const mokSign = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SignUP />
      </BrowserRouter>
    </Provider>
  );
};

describe("password test", () => {
  it("should render the form sign up with initial values", () => {
    render(mokSign());

    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm password"
    ) as HTMLInputElement;

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(confirmPasswordInput.value).toBe("");
  });

  it("should update email field on input change", () => {
    render(mokSign());
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should show error message when confirm password does not match", () => {
    render(mokSign());

    const passwordInput = screen.getByPlaceholderText(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm password"
    ) as HTMLInputElement;

    // Enter passwords that do not match
    fireEvent.change(passwordInput, { target: { value: "Password1" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password" },
    });
    fireEvent.blur(confirmPasswordInput);

    expect(
      screen.getByText("Both passwords must be the same")
    ).toBeInTheDocument();
  });

  it("snapshot matches", () => {
    const { asFragment } = render(mokSign());

    expect(asFragment()).toMatchSnapshot();
  });
});
