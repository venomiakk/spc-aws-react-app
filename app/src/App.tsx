// import './App.css'

import { AuthProvider } from "./components/AuthProvider";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </>
  );
}

export default App;
