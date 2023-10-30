import React, { useEffect } from "react";
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import { AppContext
 } from "../../context/AppContext";
function MainPage() {
  const { state, dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user === null) {
      navigate("/welcome");
    }
  }, [state.user, navigate]);

  return <div>MainPage</div>;
}

export default MainPage;
