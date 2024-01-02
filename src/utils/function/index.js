const getDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
};

const subStringText = (text) => {
  if (text.length > 40) {
    return text.substring(0, 40) + `...`
  } else {
    return text
  }
}

export {
    getDataFromLocalStorage,
    subStringText
}