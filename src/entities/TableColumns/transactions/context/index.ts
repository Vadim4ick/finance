"use client";

import { createDomain } from "effector";

const modals = createDomain();

export const openCreateTransactionModal = modals.createEvent();
export const closeCreateTransactionModal = modals.createEvent();

export const openEditTransactionModal = modals.createEvent();
export const closeEditTransactionModal = modals.createEvent();

export const setEditTransactionModalId = modals.createEvent<string | null>();
export const deleteEditTransactionModalId = modals.createEvent();

export const $modalCreateTransaction = modals
  .createStore(false)
  .on(openCreateTransactionModal, () => true)
  .on(closeCreateTransactionModal, () => false);

export const $modalEditTransaction = modals
  .createStore(false)
  .on(openEditTransactionModal, () => true)
  .on(closeEditTransactionModal, () => false);

export const $modalEditTransactionId = modals
  .createStore<string | null>(null)
  .on(setEditTransactionModalId, (_, props) => props)
  .on(deleteEditTransactionModalId, () => null);
