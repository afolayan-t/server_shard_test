import logo from './logo.svg';
import './App.css';
import axios from 'axios';

//Get Function
function Get_Func() {
  document.getElementById("ActG").action = document.getElementById("search").value;
  document.getElementById("get-btn").click();

  }
 
function input(){
  if(document.getElementsByClassName("btn").value === "option 1"){
    Get_Func()
  } else{Post_Func()}
}
 //Trying to get the search bar to complete an event click handler
/*document.getElementById("search").addEventListener('keypress', function(e){
  if (e.key === 'Enter') {
   Post_Func()
  }
});

document.getElementById("search").EventListener('keypress', function(e){
  if (e.key === 'Enter') {
   Post_Func()
  }
});*/
//Change the event listener to redirect based on clicking the get button
//document.getElementById("get-btn").onclick = function() {Get_Func()};
//Or redirect based pressing enter on the search bar


//Post Function
function Post_Func() {
  document.getElementById("ActP").action = document.getElementById("search").value;
  document.getElementById("post-btn").click();
} 

//Talk with Back-End to request number
//Ex: send Job Post request
function Num_Gen(){
  axios.post('http://127.0.0.1:5000/1/send_job')
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
        <option value="option 1">
            <form id="ActG" action="" method="GET"> 
              <button onClick={Get_Func} id="get-btn">GET Button</button> 
            </form>
        </option>
        <option value="option 2">
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

//https://www.youtube.com/watch?v=qM4G1Ai2ZpE&ab_channel=Academind
//$( document ).ready()
 //The two functions place search value into action=""
 /*function Get_Func() {
    fetch(document.getElementById("search").value) 
      .then((res) =>
      res.send(document.getElementById("pi").innerHTML(res.json()))
      )
      .catch((error) =>
    console.log(error));
    }
   // document.getElementById("ActG").action = document.getElementById("search").value; 
  function Post_Func() {
    document.getElementById("ActP").action = document.getElementById("search").value;
  } 
*/
  //Goal:When this button is clicked, it will call the express app and log the req/res - fake_load_balancer
  //Interface with the Load Balancer
  //Send request/Update Information on the same page
  //Communicate with the back End or Express App?
  
