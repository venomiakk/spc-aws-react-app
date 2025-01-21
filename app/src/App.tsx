// import './App.css'

import { AuthProvider } from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import FileSpace from "./components/FileSpace";
import "./global.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <FileSpace />
      </AuthProvider>
    </>
  );
}

export default App;
