"use client";

import { useLogoutUser } from "@/entities/AuthForm";

const Header = () => {
  const logoutMutate = useLogoutUser();

  return (
    <header>
      <h1>Header</h1>

      <button onClick={() => logoutMutate.mutate()}>Выход</button>
    </header>
  );
};

export { Header };
