// Code downloaded from Observable Notebook
// Working Observable Notebook can be viewed here: https://observablehq.com/d/2a64ac4d41285c32

function _1(md){return(
md`# RDU Weather`
)}

function _workbook(FileAttachment){return(
FileAttachment("RDUweather.xlsx").xlsx()
)}

function _3(workbook){return(
workbook.sheetNames
)}

function _data(workbook){return(
workbook.sheet(0, {
    headers: true,
    // range: "A1:F10"
  })
)}

function _5(__query,data,invalidation){return(
__query(data,{from:{table:"data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data")
)}

function _data1(data){return(
data.map(item => {
    let date = new Date(item.Date);
    return {
        ...item,
        year: date.getFullYear(),
        month: date.getMonth() + 1, // getMonth() returns 0-based index
        day: date.getDate()
    };
})
)}

function _7(__query,data1,invalidation){return(
__query(data1,{from:{table:"data1"},sort:[],slice:{to:null,from:null},types:[{name:"TMAX",type:"integer"}],filter:[],select:{columns:null}},invalidation,"data1")
)}

function _data_jul4(data1){return(
data1.filter(d => d.day === 4 && d.month === 7)
)}

function _data_jan1(data1){return(
data1.filter( d=> d.day === 1 && d.month === 1)
)}

function _10(Plot,data_jul4){return(
Plot.plot({
  title: "Maximum Daily Temperature on July 4th",
  x: {
    tickFormat: tick => tick.toString(),
    label: "Year"
  },
  y: {
    grid:true,
    label: "Maximum Temperature (˚F)"
  },
  marks: [
    Plot.lineY(data_jul4, {
      x: "year", 
      y: "TMAX", 
      stroke: "red", strokeWidth: 2}),
    Plot.linearRegressionY(data_jul4, {
      x: "year", 
      y: "TMAX", 
      stroke: "gray", fillOpacity: 0, strokeWidth: 1, strokeDasharray: 3, strokeDashoffset: 2
    })
  ]
})
)}

function _11(Plot,data_jan1){return(
Plot.plot({
  title: "Minimum Daily Temperature on January 1st",
  x: {
    tickFormat: tick => tick.toString(),
    label: "Year"
  },
  y: {
      grid:true,
    label: "Minimum Temperature (˚F)"
  },
  marks: [
    Plot.lineY(data_jan1, {
      x: "year", 
      y: "TMIN", 
      stroke: "blue", strokeWidth: 2}),
    Plot.linearRegressionY(data_jan1, {
      x: "year", 
      y: "TMIN", 
      stroke: "gray", fillOpacity: 0, strokeWidth: 1, strokeDasharray: 3, strokeDashoffset: 2
    })
  ]
})
)}

function _snowfallbyyear_map(d3,data1){return(
d3.rollup(
  data1,
  values => d3.sum(values, d => d.SNOW),
  d => d.year
)
)}

function _snowfallbyyear(snowfallbyyear_map){return(
Array.from(snowfallbyyear_map, ([year,snow]) => ({year, snow}))
)}

function _14(snowfallbyyear){return(
snowfallbyyear.splice(0,1)
)}

function _15(Plot,snowfallbyyear){return(
Plot.plot({
  y: {
    grid: true,
    label: "Total Snowfall (inches)"
  },
  x: {
    tickFormat:tick=>tick.toString(),
    tickRotate: -90,
    label: "Year"
  },
  title: "Total Snowfall per Year",
  height: 400,
  width: 1200,
  marginBottom: 50,
  marks: [
    Plot.ruleY([0]),
    Plot.barY(snowfallbyyear, {
      x: "year", 
      y: "snow",
      fill: "lightblue"
    })
  ],
})
)}

function _data_snowday(data1){return(
data1.filter(d => d.SNOW > 0)
)}

function _snowdaysbyyear_map(d3,data_snowday){return(
d3.rollup(
  data_snowday,
  data_snowday => d3.count(data_snowday, d=> d.day),
  d => d.year
)
)}

function _snowdaysbyyear(snowdaysbyyear_map){return(
Array.from(snowdaysbyyear_map,([year, snowdays]) => ({year, snowdays}))
)}

function _19(Plot,snowdaysbyyear){return(
Plot.plot({
  y: {
    grid: true,
    label: "Number of Days with Snowfall"
  },
  x: {
    tickFormat:tick=>tick.toString(),
    tickRotate: -90,
    label: "Year",
    domain: [1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1953, 1954, 1955,	1956,	1957,	1958, 1959,	1960,	1961,	1962,	1963, 1964,	1965,	1966,	1967,	1968,	1969,	1970,	1971,	1972,	1973,	1974, 1975,	1976,	1977,	1978,	1979,	1980,	1981,	1982,	1983,	1984,	1985,	1986,	1987,	1988,	1989,	1990, 1991,	1992,	1993,	1994,	1995,	1996, 1997,	1998,	1999,	2000,	2001,	2002,	2003,	2004,	2005,	2006, 2007, 2008,	2009,	2010,	2011,	2012,	2013,	2014,	2015,	2016,	2017,	2018,	2019,	2020,	2021,	2022, 2023,	2024,	2025]
  },
  title: "Days of Snowfall per Year",
  height: 400,
  width: 1200,
  marginBottom: 50,
  marks: [
    Plot.ruleY([0]),
    Plot.barY(snowdaysbyyear, { 
      x: "year",
      y: "snowdays",
      fill: "gray"
    })
  ],
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["RDUweather.xlsx", {url: new URL("./files/530e696da362cf9ed11f2fb2bf513724634c454dc79be2f8480348fec49b66c1aef879add7a55d758552ac5116bcecef93c7638c7bb2d377c158091241abfa1c.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("workbook")).define("workbook", ["FileAttachment"], _workbook);
  main.variable(observer()).define(["workbook"], _3);
  main.variable(observer("data")).define("data", ["workbook"], _data);
  main.variable(observer()).define(["__query","data","invalidation"], _5);
  main.variable(observer("data1")).define("data1", ["data"], _data1);
  main.variable(observer()).define(["__query","data1","invalidation"], _7);
  main.variable(observer("data_jul4")).define("data_jul4", ["data1"], _data_jul4);
  main.variable(observer("data_jan1")).define("data_jan1", ["data1"], _data_jan1);
  main.variable(observer()).define(["Plot","data_jul4"], _10);
  main.variable(observer()).define(["Plot","data_jan1"], _11);
  main.variable(observer("snowfallbyyear_map")).define("snowfallbyyear_map", ["d3","data1"], _snowfallbyyear_map);
  main.variable(observer("snowfallbyyear")).define("snowfallbyyear", ["snowfallbyyear_map"], _snowfallbyyear);
  main.variable(observer()).define(["snowfallbyyear"], _14);
  main.variable(observer()).define(["Plot","snowfallbyyear"], _15);
  main.variable(observer("data_snowday")).define("data_snowday", ["data1"], _data_snowday);
  main.variable(observer("snowdaysbyyear_map")).define("snowdaysbyyear_map", ["d3","data_snowday"], _snowdaysbyyear_map);
  main.variable(observer("snowdaysbyyear")).define("snowdaysbyyear", ["snowdaysbyyear_map"], _snowdaysbyyear);
  main.variable(observer()).define(["Plot","snowdaysbyyear"], _19);
  return main;
}
