import logo from './logo.svg';
import './App.css';
import axios from 'axios';

//Checks for the exact value of the link
//TODO: Recognize Method based on clicked button
//Add another document for post method
function input(e){
  if (e.key === 'Enter') {
    if(document.getElementById("search").value === "http://127.0.0.1:5000/" ||
    document.getElementById("search").value === "http://127.0.0.1:5000/1/ping"  ){
      Get_Func()
    } else if(document.getElementById("search").value === "http://127.0.0.1:5000/1/send_job" ||
    document.getElementById("search").value === "http://127.0.0.1:5000/add_shards?num_shards_to_add=5" ||
    document.getElementById("search").value === "http://127.0.0.1:5000/remove_shards?num_shards_to_remove=1" )
    {Post_Func()}
  } else{return}
}

//Get Function
function Get_Func() {
  document.getElementById("ActG").action = document.getElementById("search").value;
  document.getElementById("get-btn").click();
  }

//Post Function
function Post_Func() {
  document.getElementById("ActP").action = document.getElementById("search").value;
  document.getElementById("post-btn").click();
} 

//Talk with Back-End to request number
//Ex: send Job Post request
function Num_Gen(){
  axios.post('http://127.0.0.1:3000/1/send_job')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with React
        </a>
  <header className="App-header">
    <h1 className="Head">Enter the URL and decide between a Get or Post Method:</h1>
    <div id ="buttons">
      <select name="selectList" className="btn">
        <option id="Ops" value="option 1">
            <form id="ActG" action="" method="GET"> 
              <button onClick={Get_Func} id="get-btn">GET Button</button> 
            </form>
        </option>
        <option id="Ops2" value="option 2">
            <form id="ActP" action="" method="POST">
              <button onClick={Post_Func} id="post-btn">POST Button</button>
            </form>
        </option>
      </select>
      <button className="btn" onClick={Num_Gen}>Get a random number</button>
    </div>
      <input id="search" type="text" onKeyPress={input}></input>
  </header>
    </div>
  );
}

export default App;


  
