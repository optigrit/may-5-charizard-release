import { combineReducers } from "redux";
import CartReducer from "./AddToCart/Cart-Reducer";
import WishlistReducer from "./AddToWishlist/Wishlist-Reducer";
import ReducerFilterChip from "./FilterChipData/FilterChipData-Reducer";
import UserReducer from "./UserData/User-Reducer";
import EditCourse from "./EditCourse/EditCourse-Reducer";
import TaskReducer from "./Task/Task-Reducer";

const RootReducer = combineReducers({
  CartReducer,
  WishlistReducer,
  ReducerFilterChip,
  UserReducer,
  EditCourse,
  TaskReducer
});
export default RootReducer;
