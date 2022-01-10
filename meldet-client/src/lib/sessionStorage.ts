export const getSessionStorage = (key: string) => {
  if (!window) return;
    const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null
};

export const setSessionStorage = (key: string, value: any) => {
  if (!window) return;
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export const clearSessionStorage = () => {
  if (!window) return;
  sessionStorage.clear()
}


