"use client";

import { User } from "@/entities/AuthForm";
import { createDomain } from "effector";

const profile = createDomain();

export const setProfile = profile.createEvent<User>();

export const $profile = profile
  .createStore<User | null>(null)
  .on(setProfile, (_, props: User) => props);
