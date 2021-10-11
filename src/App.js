import "./App.css";
/* Components */
import Header from "./components/Header";
/* Pages */
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        {/*Remove the home file from here and add react router here.  */}
        <Home />
      </div>
    </>
  );
}

export default App;
