import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HelperPassword from "./passwordHelper";
import { useHelperPassWordValidator } from "../../../core/hooks/validatorHook";
import { PasswordRequirement } from "../../../shared/consts/passwordRequirement";

jest.mock("../../../core/hooks/validatorHook");

describe("password test", () => {
  test("check valid passwords", () => {
    const mockCheckPassWord = jest.fn();
    const passWord = "ValidPass123!";
    const mockValidPassword = {
      length_password: true,
      letters: true,
      numbers: true,
      special_symbols: true,
    };

    (useHelperPassWordValidator as jest.Mock).mockReturnValue({
      validPassword: mockValidPassword,
      allValuePassword: Object.values(mockValidPassword).every((v) => v),
      checkPassWord: mockCheckPassWord,
    });

    const mockProps = {
      requirements: PasswordRequirement,
      classUl: "hint-password",
      classLi: "hints",
      value: passWord,
      isValidField: true,
    };

    render(<HelperPassword {...mockProps} />);

    expect(mockCheckPassWord).toHaveBeenCalledWith(passWord);

    const rules = screen.getAllByRole("listitem");
    rules.forEach((rule) => {
      expect(rule).toHaveClass("isActive");
    });

    const ulElement = screen.getByRole("list");
    expect(ulElement).toHaveClass("isValid");
  });
});
