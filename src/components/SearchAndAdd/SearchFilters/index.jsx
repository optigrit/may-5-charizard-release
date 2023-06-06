import userData from "./DummyData/userData";
import courseData from "./DummyData/courseData";
import contestData from "./DummyData/contestData";
import filterItem from "./FilterItem";

const filteredData = (itemType, value) => {
  const data =
    itemType === "users"
      ? userData
      : itemType === "courses"
      ? courseData
      : contestData;

  return data.filter(
    (result) => value && result && filterItem(itemType, value, result)
  );
};

export default filteredData;
