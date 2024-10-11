import {object, string} from "yup";

export const LoginSchema = object ({
  name: string().required().label("Name").min(2).max(50),
  password: string().required().label("Password").min(6).max(50),
});
