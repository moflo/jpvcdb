import redirect from "./redirect";
import firebaseManager from './firebaseManager'

export const doGooglePopup = () => firebaseManager.sharedInstance.handleLogin()

export const doEmailSignin = (email,pass) => firebaseManager.sharedInstance.handleEmailLogin(email,pass)

export const isAuthenticated = ctx => firebaseManager.sharedInstance.isLoggedIn()

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect("/dashboard", ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = ctx => {
  if (!isAuthenticated(ctx)) {
    redirect("/login", ctx);
    return true;
  }
  return false;
};
