export type UserSession = {
  loggedIn: boolean;
  email?: string;
};

export const LOGGED_OUT_USER: UserSession = {
  loggedIn: false,
};
