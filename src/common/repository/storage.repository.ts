const AUTH_STATE: string = 'isLoggedIn';

function setAuthState(state: boolean): void {
  localStorage.setItem(AUTH_STATE, String(state));
}

function getAuthState(): boolean {
  const authState = localStorage.getItem(AUTH_STATE);
  if (authState) {
    return JSON.parse(authState);
  }
  return false;
}

function clear(): void {
localStorage.clear();
}

export const storageRepository = {
  setAuthState,
  getAuthState,
  clear,
};
