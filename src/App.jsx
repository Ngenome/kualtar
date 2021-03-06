import { useState, useEffect, useRef } from "react";
import "./App.css";
import { baseURL, ListStuff } from "../saintslist";
import axios, { Axios } from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [logged, setLogged] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [ListValue, setListvalue] = useState("cases");
  // var dirSl = useRef(null);
  function dirNavigate() {
    var dirSelect = document.querySelector("#dirs");
    setListvalue(dirSelect.value);
  }

  return (
    <div className="App min-h-screen w-screen">
      {logged == true ? (
        <div className="mainwrap">
          <select onInput={dirNavigate} name="dirs" id="dirs">
            <option value="Saints">Saints</option>
            <option value="Cases">Cases</option>
            <option value="Fellowships">Fellowships</option>
            <option value="Activities">Activities</option>
            <option value="Lists">Lists</option>
            <option value="Reports">Reports</option>
          </select>
          <ListStuff
            item={ListValue}
            displayValues={["id", "name", "phone", "residence", "stability"]}
            token={authToken}
          />
          {/* <nav>
            <ul id="saints-dir">Saints</ul> <ul id="cases-dir">Cases</ul>
            <ul id="fellowships-dir">Fellowships</ul>
            <ul id="activities-dir">Activities</ul>
            <ul id="reports-dir">Reports</ul>
            <ul id="lists-dir">checklists</ul>
          </nav> */}
        </div>
      ) : (
        <LoginScreen setter={setLogged} setToken={setAuthToken} />
      )}
    </div>
  );
}
function LoginScreen(props) {
  return (
    <div>
      <h1 className="text-gray-200 text-2xl font-bold ">Login</h1>
      <div className="forms mt-5">
        <form className="flex flex-col items-center" action="">
          <div className="labelWrapper">
            <label className="lbls" htmlFor="username">
              Username
            </label>
            <input type="text" id="username" className="loginInputs" />
          </div>
          <div className="labelWrapper">
            <label className="lbls" htmlFor="username">
              Password
            </label>
            <input type="password" className="loginInputs" id="password" />
          </div>
          <button
            className="text-gray-200 bg-blue-800 rounded h-7 text-base p-1 text-center items-center"
            onClick={(e) => {
              e.preventDefault();
              axios
                .post(`${baseURL}auth/login`, {
                  username: "kelvin",
                  password: "@super.user",
                })
                .then((e) => {
                  props.setToken(e.data.token);
                  if (typeof Storage !== "undefined") {
                    localStorage.setItem("kualtarAuthToken", e.data.token);
                    console.log(e.data.token);
                  } else {
                    alert("sorry Local storage is not supported on your phone");
                  }
                  // alert(e.data);
                  props.setter(true);
                })
                .catch((e) => {
                  alert(e);
                });
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
function TextInput(props) {
  return (
    <div className="wrap mt-2 flex flex-col h-11 rounded-md">
      <label
        className="text-gray-300 text-left  text-base  "
        htmlFor={props.for}
      >
        {props.label}
      </label>
      <input
        className="w-60"
        id={props.label}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}
function SelectInput(props) {
  return <select name={props.name} id=""></select>;
}
function FormPage() {
  return (
    <div>
      <div className="flex flex-col h-screen w-screen bg-gray-800">
        <h2 className="text-center text-lg text-gray-300">Add Saint</h2>
        <form action="" className="flex flex-col">
          <TextInput type="text" placeholder="Name" label="Name" for="name" />
          <TextInput
            type="tel"
            placeholder="Phone No"
            label="Contact"
            for="telephone"
          />
          <TextInput
            type="text"
            placeholder="residence"
            label="Residence"
            for="residence"
          />
          <TextInput
            type="text"
            placeholder="Department"
            label="department"
            for="Department"
          />
          <TextInput
            type="text"
            placeholder="home altar"
            label="Home Altar"
            for="homealtar"
          />
          <TextInput
            type="text"
            placeholder="comment"
            label="comment"
            for="comment"
          />
          <div className="wrap mt-2 flex flex-col h-11 rounded-md">
            <label
              className="text-gray-300 text-left  text-base  "
              htmlFor="year"
            >
              Year of Study
            </label>
            <select className="w-60">
              <option value={1}>1</option>
              <option value={2}>1</option>
              <option value={3}>1</option>
              <option value={4}>1</option>
              <option value="non-student">Non student</option>
            </select>
          </div>
          <div className="wrap mt-2 flex flex-col h-11 rounded-md">
            <label
              className="text-gray-300 text-left  text-base  "
              htmlFor="stability"
            >
              Stability
            </label>
            <select id="stability" className="w-60">
              <option value={1}>Stable</option>
              <option value={2}>Mid Stability</option>
              <option value={3}>Unstable</option>
            </select>
          </div>
          <div className="wrap mt-2 flex flex-col h-11 rounded-md">
            <label
              className="text-gray-300 text-left  text-base"
              htmlFor="visitor"
            >
              Visitor
            </label>
            <select id="visitor" className="w-60">
              <option value={1}>True</option>
              <option value={2}>False</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
