const filterItem = (itemType, value, result) => {
  if (itemType === "users")
    return (
      result.name &&
      (result.name.toLowerCase().includes(value) ||
        result.username.toLowerCase().includes(value))
    );
  else return result.title && result.title.toLowerCase().includes(value);
};

export default filterItem;
