import { combineReducers } from "redux";
import { adoptionReducer } from "src/pages/adoption/store/reducer";
import { foundFormReducer } from "src/pages/found/components/store/reducer";
import { loginReducer } from "src/pages/login/store/reduser";
import { petsReducer } from "src/pages/petsList/store/reduser";
import { petReducer } from "src/pages/PetView/store/reduser";
import { postsReducer } from "src/pages/posts/store/reducer";
import { signUpReducer } from "src/pages/signUp/store/reduser";
import { loadingReducer } from "src/store/sharedStore/loading/reducer";
import { similarPetsReducer } from "src/store/sharedStore/similarPets/reduser";

import { authReducer } from "./sharedStore/authStore/reducers";

const rootReducer = combineReducers({
  petReducer,
  petsReducer,
  similarPetsReducer,
  authReducer,
  signUpReducer,
  loginReducer,
  postsReducer,
  adoptionReducer,
  foundFormReducer,
  loading: loadingReducer
});

export default rootReducer;
