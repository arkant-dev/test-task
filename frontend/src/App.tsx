import { useEffect, useState } from "react";
import { MapScreen } from "./components/MapScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { appStore } from "./store/AppStore";
import "./App.css";

function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    if (isMapOpen) {
      appStore.connect();
    }

    return () => {
      appStore.disconnect();
    };
  }, [isMapOpen]);

  if (isMapOpen) {
    return <MapScreen />;
  }

  return <WelcomeScreen onStart={() => setIsMapOpen(true)} />;
}

export default App;
