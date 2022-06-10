export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (!serializedState) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const saveState = (item, state) => {
  try {
    const serializedState = JSON.stringify(item);
    localStorage.setItem(state, serializedState);
  } catch {
    // ignore write errors
  }
};

export const removeState = (state) => {
  try {
    localStorage.removeItem(state);
  } catch {
    // ignore write errors
  }
};
