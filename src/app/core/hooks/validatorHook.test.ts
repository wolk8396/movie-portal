import { act, renderHook } from "@testing-library/react";
import { useHelperPassWordValidator } from "./validatorHook";

describe("useHelperPassWordValidator", () => {
  it("should return initial values", () => {
    const { result } = renderHook(() => useHelperPassWordValidator());

    expect(result.current.validPassword).toEqual({
      length_password: false,
      letters: false,
      numbers: false,
      special_symbols: false,
    });
    expect(result.current.allValuePassword).toBe(false);
  });

  it("should validate correct password", () => {
    const { result } = renderHook(() => useHelperPassWordValidator());

    act(() => {
      result.current.checkPassWord("ValidPass123!");
    });

    expect(result.current.validPassword).toEqual({
      length_password: true,
      letters: true,
      numbers: true,
      special_symbols: true,
    });
    expect(result.current.allValuePassword).toBe(true);
  });

  it("should validate incorrect password", () => {
    const { result } = renderHook(() => useHelperPassWordValidator());

    act(() => {
      result.current.checkPassWord("pass");
    });

    expect(result.current.validPassword).toEqual({
      length_password: false,
      letters: false,
      numbers: false,
      special_symbols: false,
    });
    expect(result.current.allValuePassword).toBe(false);
  });

  it("should validate partial correct password", () => {
    const { result } = renderHook(() => useHelperPassWordValidator());
    act(() => {
      result.current.checkPassWord("ValidPa");
    });
    const check = Object.values(result.current.validPassword).every((v) => v);

    expect(check).toBeFalsy();
    expect(result.current.allValuePassword).toBeFalsy();
  });
});
