import { createDomain } from "effector";
import { TypeForm } from "../type";

const typeForm = createDomain();

export const toggleType = typeForm.createEvent();

export const $currentAuthForm = typeForm
  .createStore<TypeForm>("auth")
  .on(toggleType, (state) => (state === "auth" ? "register" : "auth"));
