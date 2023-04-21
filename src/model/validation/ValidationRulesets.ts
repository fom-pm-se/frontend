import {EMAIL, MINLENGTH, PASSWORD, REQUIRED} from "@/model/validation/FieldValidation";

export const NEW_PASSWORD_RULESET = [
  (value: any) => REQUIRED(value),
  (value: any) => MINLENGTH(8, value),
  (value: any) => PASSWORD(value)
];

export const ENTER_PASSWORD_RULESET = [
  (value: any) => REQUIRED(value),
  (value: any) => MINLENGTH(8, value)
];
export const REQUIRED_RULESET = [
  (value: any) => REQUIRED(value)
];

export const EMAIL_RULESET = [
  (value: any) => REQUIRED(value),
  (value: any) => EMAIL(value)
];
