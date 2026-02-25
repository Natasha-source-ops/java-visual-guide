export const AUTH_STORAGE_KEY = "java_visual_guide_auth_ok";
const AUTH_TOKEN_VALUE = "1";

const AUTH_USERNAME = "tutorJava26";
const AUTH_PASSWORD = "accessGr@nted!26";

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_STORAGE_KEY) === AUTH_TOKEN_VALUE;
}

export function tryLogin(username: string, password: string): boolean {
  const isValid = username === AUTH_USERNAME && password === AUTH_PASSWORD;
  if (isValid) {
    localStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN_VALUE);
  }
  return isValid;
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
