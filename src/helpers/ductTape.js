const objToArray = function (obj) {
  const arr = [];

  for (let i in obj) {
    arr.push(obj[i]);
  }

  return arr;
};

export { objToArray };
