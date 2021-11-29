import axios from "axios";
import React, { useEffect, useState } from "react";
export const baseURL = "http://localhost:8000/";
export function ListStuff(props) {
  const [data, setData] = React.useState([]);
  const [arr, setArr] = React.useState([]);
  const [conditions, setConditions] = useState([]);
  var conds = [];
  var condObj = {};
  var filterArray = [];
  let newFilterArray;
  let flConds;
  var lsfilter = "residence";

  for (let zm = 0; zm < data.length; zm++) {
    filterArray.push(data[zm][lsfilter]);
    newFilterArray = [...new Set(filterArray)];
  }

  var lst = [];

  const item_query = props.item.toLowerCase();
  React.useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}api/${item_query}/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `token ${props.token}`,
      },
    }).then((resp) => {
      setData(resp.data);
      console.log(resp.data);
      setArr(Object.values(resp.data[0]));
    });
  }, []);
  if (props.item == "cases") {
    data.forEach((value) => {
      conds.push(value.condition);
      flConds = [...new Set(conds)];

      // setConditions(conds);
    });
    flConds.forEach((flcond) => {
      condObj[flcond] = 0;
    });
    conds.forEach((cond) => {
      flConds.map((flcond) => {
        if (cond == flcond) {
          condObj[flcond]++;
        }
      });
    });
    console.log(condObj);
  }
  if (props.item != "cases") {
    return (
      <div className="h-screen w-screen bg-gray-900">
        <h2 class="text-white font-sans text-xl">{props.item}</h2>
        <div className="hr h-px w-screen bg-red-200"></div>
        <div className="flex flex-row w-screen h-12 justify-between bg-blue-800">
          <div className="wrap flex flex-row">
            <label htmlFor="filter">Filter by</label>
            <select name="filter" id="filter" class="h-8 bg-blue-600 rounded">
              {props.displayValues.map((e, i) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>
          <div className="wrap flex flex-row">
            <label htmlFor="filter_value">Value</label>
            <select name="filter_value_options" id="filter_value_options">
              {newFilterArray != undefined ? (
                newFilterArray.map((k, ei) => {
                  return <option>{k}</option>;
                })
              ) : (
                <option></option>
              )}
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <table>
            <tr>
              {props.displayValues.map((e, i) => {
                return <th>{e}</th>;
              })}
            </tr>
            {data.map((e, i) => {
              return (
                <tr>
                  {props.displayValues.map((ek, index) => (
                    <td className="tail_td">{e[ek]}</td>
                  ))}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen w-screen bg-gray-900 flex-col items-center ">
        <h1 className="text-purple-400">Gate One Cases</h1>
        <div className="rowWrappper flex flex-row flex-wrap justify-center">
          {data.map((cc, i) => {
            conds.push(cc.condition);
            var tc = conds;
            return (
              <div className="caseWrap h-40 bg-indigo-900 mb-0.5 flex flex-row justify-between">
                <div
                  id="caseView"
                  className="flex flex-nowrap flex-col justify-start items-start "
                >
                  <span className="caseSpans">{cc.name}</span>
                  <span className="caseSpans">{cc.condition}</span>
                  <span className="caseSpans">{cc.contact}</span>
                  <span className="caseSpans">{cc.residence}</span>
                  <span className="caseSpans">{cc.recorded}</span>
                </div>
                <div id="caseImages flex">
                  <a href={cc.image}>
                    <img
                      className=" h-40 w-64 object-contain rounded-md"
                      src={cc.image}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="stats flex flex-col  text-gray-400">
          <span>Total Cases: {data.length}</span>
          {flConds.map((flc, flci) => {
            return (
              <span>
                {flc}:{condObj[flc]}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}
const ImagesView = (props) => {
  var viewings = props.images.map((e, i) => {
    axios
      .get(`${baseURL}gateoneimages/${e}/`)
      .then((resp) => {
        return <img src={resp.data.image} />;
        console.log(viewings);
      })
      .catch((err) => {
        alert(err);
      });
  });

  return <div>{viewings}</div>;
};
function Fetch(props) {
  var model = [];
  props.data.forEach((element) => {
    fetch(`http://localhost:8000/api/gateoneimages/${element}/`)
      .then((res) => model.push(res.data.image))
      .then((d) => {
        console.log(d);
      });
  });
  return model.map((e, i) => (
    <img src="https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-768x1152.jpg" />
  ));
}
