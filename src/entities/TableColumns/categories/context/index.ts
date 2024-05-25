"use client";

import { createDomain } from "effector";

const modals2 = createDomain();

export const openCreateCategoryModal = modals2.createEvent();
export const closeCreateCategoryModal = modals2.createEvent();

export const openEditCategoryModal = modals2.createEvent();
export const closeEditCategoryModal = modals2.createEvent();

export const setEditCategoryModalId = modals2.createEvent<string | null>();
export const deleteEditCategoryModalId = modals2.createEvent();

export const $modalCreateCategory = modals2
  .createStore(false)
  .on(openCreateCategoryModal, () => true)
  .on(closeCreateCategoryModal, () => false);

export const $modalEditCategory = modals2
  .createStore(false)
  .on(openEditCategoryModal, () => true)
  .on(closeEditCategoryModal, () => false);

export const $modalEditCategoryId = modals2
  .createStore<string | null>(null)
  .on(setEditCategoryModalId, (_, props) => props)
  .on(deleteEditCategoryModalId, () => null);
