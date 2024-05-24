"use client";

import { createDomain } from "effector";
import { Account } from "../columns/account/types/account";

const modals = createDomain();

// const accounts = createDomain();

export const openAccountModal = modals.createEvent();
export const closeAccountModal = modals.createEvent();

export const setAccounts = modals.createEvent<Account[]>();

export const $modalAccount = modals
  .createStore(false)
  .on(openAccountModal, () => true)
  .on(closeAccountModal, () => false);

// export const $accounts = accounts
//   .createStore<Account[]>([])
//   .on(setAccounts, (prevState, props) => props);
