const getDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
};

export {
    getDataFromLocalStorage
}