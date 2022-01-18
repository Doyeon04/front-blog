import "./App.css";
import Header from './component/header/Header'
import TitleBox from './component/titleBox/titleBox'

function App() {
  return (
    <div className="App"
    style ={{
      height: '1000vh'
    }}>
      <Header></Header>
      <TitleBox></TitleBox>
    </div>
  );
}

export default App;
