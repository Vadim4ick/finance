import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Dropdown = (props: Props) => {
  const { children } = props;

  return <div>{children}</div>;
};

export { Dropdown };
