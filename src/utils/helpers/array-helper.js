export const RemoveItemFromArray = (array, value) => {
  const index = array.indexOf(value);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};
