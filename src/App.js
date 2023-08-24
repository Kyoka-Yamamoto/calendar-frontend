import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  console.log("Rendering App component");
  return (
    <div className="App">
      <div className="container-main">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
