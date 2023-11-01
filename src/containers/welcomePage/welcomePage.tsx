import React, { useEffect, useContext } from "react";
import "./welcomePage.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Button } from 'native-base';
import { Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

function WelcomePage() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user !== null) {
      navigate("/"); 
    }
  }, [state.user, navigate]);

  const handleLogin = () => {
    navigate("/signIn"); 
  };

  const handleRegister = () => {
    navigate("/signUp"); 
  };

  return (
    <div className="welcome-page">
      <h1>Hoş Geldiniz!</h1>
      <p>Uygulamamızı kullanarak ödemelerinizi takip edebilir ve taksitlendirebilirsiniz.</p>
      <div className="button-group">
        <Button onPress={handleLogin}>
          <Ionicons name='mail' size={24} color="black" />
          <Text>Giriş Yap</Text>
        </Button>
        <Button onPress={handleRegister}>
          <Ionicons name='person' size={24} color="black" />
          <Text>Kayıt Ol</Text>
        </Button>
      </div>
    </div>
  );
}

export default WelcomePage;
