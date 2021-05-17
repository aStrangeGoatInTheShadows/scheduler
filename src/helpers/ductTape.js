const objToArray = function (obj) {
  const arr = [];

  // console.log("objToArray input and type", obj, typeof obj);

  for (let i in obj) {
    arr.push(obj[i]);
  }

  return arr;
};

export { objToArray };
