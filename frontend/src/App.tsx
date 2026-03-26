import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { MapScreen } from "./components/MapScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { appStore } from "./store/AppStore";
import "./App.css";

const App = observer(() => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    return () => {
      appStore.disconnect();
    };
  }, []);

  const handleStart = async () => {
    const isAuthorized = await appStore.connect(appStore.authKey);

    if (isAuthorized) {
      setIsMapOpen(true);
    }
  };

  if (isMapOpen) {
    return <MapScreen />;
  }

  return (
    <WelcomeScreen
      authKey={appStore.authKey}
      errorMessage={appStore.errorMessage}
      isConnecting={appStore.connectionStatus === "connecting"}
      onAuthKeyChange={appStore.setAuthKey}
      onStart={handleStart}
    />
  );
});

export default App;
