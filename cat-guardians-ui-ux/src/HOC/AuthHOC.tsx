import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/routing/urls";
import { selectLogInData } from "src/pages/login/store/selectors";
import { selectSignUpData } from "src/pages/signUp/store/selectors";
import { selectAuthUser } from "src/store/sharedStore/authStore/selectors";

export default function AuthHOC(Component: React.FC) {
  const WrappedComponent: React.FC = (props) => {
    const navigate = useNavigate();
    const user = useSelector(selectAuthUser);
    const loginData = useSelector(selectSignUpData);
    const signUpData = useSelector(selectLogInData);

    useEffect(() => {
      if (user || loginData || signUpData) {
        navigate(ROUTES.ROOT);
      }
    }, [user, loginData, signUpData, navigate]);

    return <Component {...props} />;
  };

  return WrappedComponent;
}
