"use client";

import { createDomain } from "effector";
import { Transaction } from "../columns/types";

export enum Variants {
  DEFAULT = "DEFAULT",
  IMPORT = "IMPORT",
}

export const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};

export interface CSVResult {
  data: any[];
  errors: any[];
  meta: {};
}

const modals = createDomain();
const variantForm = createDomain();
const importResults = createDomain();

export const openCreateTransactionModal = modals.createEvent();
export const closeCreateTransactionModal = modals.createEvent();

export const openEditTransactionModal = modals.createEvent();
export const closeEditTransactionModal = modals.createEvent();

export const setEditTransactionModalId = modals.createEvent<string | null>();
export const deleteEditTransactionModalId = modals.createEvent();

export const setVariantFormDefault = modals.createEvent();
export const setVariantFormImport = modals.createEvent();

export const setImportResults = modals.createEvent<CSVResult>();
export const removeImportResults = modals.createEvent();

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

export const $variant = variantForm
  .createStore<Variants>(Variants.DEFAULT)
  .on(setVariantFormDefault, () => Variants.DEFAULT)
  .on(setVariantFormImport, () => Variants.IMPORT);

export const $importResults = importResults
  .createStore<CSVResult>(INITIAL_IMPORT_RESULT)
  .on(setImportResults, (_, props) => props)
  .on(removeImportResults, () => INITIAL_IMPORT_RESULT);
