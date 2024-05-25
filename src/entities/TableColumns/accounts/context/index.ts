"use client";

import { createDomain } from "effector";

const modals = createDomain();

export const openCreateAccountModal = modals.createEvent();
export const closeCreateAccountModal = modals.createEvent();

export const openEditAccountModal = modals.createEvent();
export const closeEditAccountModal = modals.createEvent();

export const setEditAccountModalId = modals.createEvent<string | null>();
export const deleteEditAccountModalId = modals.createEvent();

export const $modalCreateAccount = modals
  .createStore(false)
  .on(openCreateAccountModal, () => true)
  .on(closeCreateAccountModal, () => false);

export const $modalEditAccount = modals
  .createStore(false)
  .on(openEditAccountModal, () => true)
  .on(closeEditAccountModal, () => false);

export const $modalEditAccountId = modals
  .createStore<string | null>(null)
  .on(setEditAccountModalId, (_, props) => props)
  .on(deleteEditAccountModalId, () => null);
