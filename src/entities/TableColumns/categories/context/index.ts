"use client";

import { createDomain } from "effector";
import { Category } from "../columns/types/category";

const modals2 = createDomain();

export const openCreateCategoryModal = modals2.createEvent();
export const closeCreateCategoryModal = modals2.createEvent();

export const openEditCategoryModal = modals2.createEvent();
export const closeEditCategoryModal = modals2.createEvent();

export const setEditCategoryModalId = modals2.createEvent<string | null>();
export const deleteEditCategoryModalId = modals2.createEvent();

export const setListCategoryModal = modals2.createEvent<Category[]>();

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

export const $listCategoryModal = modals2
  .createStore<Category[] | null>([])
  .on(setListCategoryModal, (_, props) => props);
