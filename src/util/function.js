export const getStringedDate = (Date) => {
  let today = Date;
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

export const setLocalStorageAndReturnData = (data, key = "diary") => {
  const endcodedData = encodeURIComponent(JSON.stringify(data));
  localStorage.setItem(key, endcodedData);
  return data;
};

export const getLocalStorageAndReturnData = (key = "diary") => {
  const endcodedData = localStorage.getItem(key);
  if (!endcodedData) return [];

  try {
    return JSON.parse(decodeURIComponent(endcodedData));
  } catch (error) {
    console.error("Decode error:", error);
    return null;
  }
};

export const getMaxIdFromLocalStorage = (key = "diary") => {
  let maxId = 0;
  const endcodedData = localStorage.getItem(key);

  if (!endcodedData) return maxId;

  JSON.parse(decodeURIComponent(endcodedData)).forEach((item) => {
    if (Number(item.id) > Number(maxId)) {
      maxId = item.id;
    }
  });
  return ++maxId;
};
