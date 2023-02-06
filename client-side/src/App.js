import logo from './logo.svg';
import './App.css';


function Get_Func() {
  fetch(document.getElementById("search").value) 
    .then((res) =>
    res.json()
    )
    .catch((error) =>
  console.log(error));
  }
 // document.getElementById("ActG").action = document.getElementById("search").value; 
function Post_Func() {
  document.getElementById("ActP").action = document.getElementById("search").value;
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
          <form id="ActG" action="" method="GET"> 
            <button onClick={Get_Func} className="btn" id="get-btn">GET Button</button> 
          </form>
          <form id="ActP" action="" method="POST">
            <button onClick={Post_Func} className="btn" id="post-btn">POST Button</button>
          </form>
        <input id="search" type="text"></input>
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
  
