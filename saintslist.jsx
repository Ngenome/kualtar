import axios from "axios";
import React, { useEffect, useState } from "react";
import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactDOM from "react-dom";

export const baseURL = "https://kualtar.pythonanywhere.com/";
export function ListStuff(props) {
  const [data, setData] = React.useState([]);
  const [arr, setArr] = React.useState([]);
  const [conditions, setConditions] = useState([]);
  const [viewData, setViewData] = useState(data);
  var previewData = [];
  var conds = [];
  var condObj = {};
  var filterArray = [];
  let newFilterArray;
  let flConds = [];
  const [lsfilter, setlsFilter] = useState("");

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
      setViewData(resp.data);
      console.log(resp.data);
      if (resp.data != null && resp.data != undefined) {
        // setArr(Object.values(data[0]));
      }
    });
  }, [props.item]);
  function ExcecuteFilter() {
    var filter_value_options = document.querySelector("#filter_value_options");

    var filteropts = document.querySelector("#filteropts");

    setlsFilter(filteropts.value);
    data.forEach((item) => {
      if (item["lsfilter"] == filter_value_options.value) {
        previewData.push(item);
        console.log(previewData);
      }
    });
    setViewData(previewData);
  }
  if (item_query == "cases") {
    viewData.forEach((value) => {
      conds.push(value.condition);
      flConds = [...new Set(conds)];

      // setConditions(conds);
    });
    flConds.map((flcond) => {
      condObj[flcond] = 0;
    });
    conds.map((cond) => {
      flConds.map((flcond) => {
        if (cond == flcond) {
          condObj[flcond]++;
        }
      });
    });
    console.log(condObj);
  }
  if (item_query == "reports") {
    return (
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
    );
  }
  if (item_query != "cases" && item_query != "reports") {
    return (
      <div className="">
        <h2 class="text-white font-sans text-xl">{props.item}</h2>
        <div className="hr h-px w-screen bg-red-200"></div>
        <div className="flex flex-row w-screen h-12 justify-between bg-blue-800">
          <div className="wrap flex flex-row">
            <label htmlFor="filter">Filter by</label>
            <select
              onInput={ExcecuteFilter}
              name="filter"
              id="filteropts"
              class="h-8 bg-blue-600 rounded"
            >
              {props.displayValues.map((e, i) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>
          <div className="wrap flex flex-row">
            <label htmlFor="filter_value">Value</label>
            <select
              onInput={ExcecuteFilter}
              name="filter_value_options"
              id="filter_value_options"
            >
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
            {viewData.map((e, i) => {
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
      <div className="flex min-h-screen w-screen  flex-col items-center ">
        <h1 className="text-purple-200">Gate One Cases</h1>
        <div className="rowWrappper flex flex-row flex-wrap justify-center">
          {data.map((cc, i) => {
            conds.push(cc.condition);
            var tc = conds;
            return (
              <div className="caseWrap bg-indigo-900 mb-0.5 flex flex-row justify-between rounded-lg">
                <div
                  id="caseView"
                  className="flex flex-nowrap flex-col justify-start items-start w-36"
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
                      className=" h-40 w-64  sm:w-56 sm:h-32 object-contain rounded-md"
                      src={cc.image}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="stats flex flex-col  text-blue-400">
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
// const ImagesView = (props) => {
//   var viewings = props.images.map((e, i) => {
//     axios
//       .get(`${baseURL}gateoneimages/${e}/`)
//       .then((resp) => {
//         return <img src={resp.data.image} />;
//         console.log(viewings);
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   });

//   return <div>{viewings}</div>;
// };
// function Fetch(props) {
//   var model = [];
//   props.data.forEach((element) => {
//     fetch(`http://localhost:8000/api/gateoneimages/${element}/`)
//       .then((res) => model.push(res.data.image))
//       .then((d) => {
//         console.log(d);
//       });
//   });
//   return model.map((e, i) => (
//     <img src="https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5-768x1152.jpg" />
//   ));
// }
