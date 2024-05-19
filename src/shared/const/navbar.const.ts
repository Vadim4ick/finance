export interface NavbarItem {
  path: string;
  name: string;
}

class NAVBAR_CLASS {
  private root = "/i";

  DASHBOARD = {
    path: this.root,
    name: "Панель статистики",
  };
  TRANSACTION = {
    path: this.root + "/transactions",
    name: "Транзакции",
  };
  CATEGORIES = {
    path: this.root + "/categories",
    name: "Категории",
  };
  SETTINGS = {
    path: this.root + "/settings",
    name: "Настройки",
  };
  ACCOUNTS = {
    path: this.root + "/accounts",
    name: "Счета",
  };
}

export const NAVBAR = new NAVBAR_CLASS();

export const arrNavbar = Object.values(NAVBAR).filter(
  (val) => typeof val === "object",
);
