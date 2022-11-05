import "antd/dist/antd.css";
import "./App.css";
import Header from "./components/header/Header";
import Hotels from "./components/hotels/Hotel-List";

function App() {
  return (
    <>
      <Header />
      <Hotels />
    </>
  );
}

export default App;
