import { LoginValidationProps } from "@/types/users.type";
import { isEmpty } from "@/utils/isEmpty";

export function userLoginValidation({
  email,
  password,
}: LoginValidationProps): string[] {
  const errors = [];

  if (isEmpty(email)) {
    errors.push("Email is required");
  }
  if (isEmpty(password)) {
    errors.push("Password is required");
  }
  return errors;
}
