import { useState } from "react";
import { MapScreen } from "./components/MapScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import "./App.css";

function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  if (isMapOpen) {
    return <MapScreen />;
  }

  return <WelcomeScreen onStart={() => setIsMapOpen(true)} />;
}

export default App;
