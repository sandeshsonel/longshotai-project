import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Popover, IconButton } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import ReactApexChart from "react-apexcharts";

import Table from "./Table";
import ReactDrag from "utils/ReactDrag";

import { intentMap } from "utils/data";
import { keywordDifficulty, nFormatter } from "utils/helpers";

const tabsOptions = [
   {
      tabName: "Broad Match",
      tag: "broad-match",
   },
   {
      tabName: "Related",
      tag: "related",
   },
   {
      tabName: "Questions",
      tag: "questions",
   },
];

const checkBoxInitialState = [
   {
      tabName: tabsOptions[0].tag,
      index: [],
   },
   {
      tabName: tabsOptions[1].tag,
      index: [],
   },
   {
      tabName: tabsOptions[2].tag,
      index: [],
   },
];

const addToListItemInitialState = [
   {
      tabName: tabsOptions[0].tag,
      outlines: [],
   },
   {
      tabName: tabsOptions[1].tag,
      outlines: [],
   },
   {
      tabName: tabsOptions[2].tag,
      outlines: [],
   },
];

const ProjectMain = () => {
   const [selectedRowCheckBox, setSelectedRowCheckBox] =
      useState(checkBoxInitialState);
   const [selectTableRowDetails, setSelectTableRowDetails] = useState(null);
   const [currentTab, setCurrentTab] = useState(tabsOptions[0].tag);
   const [anchorEl, setAnchorEl] = useState(null);
   const [addToListItems, setAddToListItems] = useState(
      addToListItemInitialState,
   );
   const [outlines, setOutlines] = useState([
      "shopping in barcelona",
      "how to open a weed shop in barcelona",
   ]);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleAddToList = () => {
      const isSelectedRowCheckbox = selectedRowCheckBox.some(
         (selectRowItem) =>
            selectRowItem.tabName === currentTab &&
            selectRowItem.index.length !== 0,
      );
      if (!isSelectedRowCheckbox) {
         toast.error(
            <p className="text-sm font-medium">
               Please select any checkbox in the table
            </p>,
            {
               id: "error",
            },
         );
      } else {
         const outlineData = [];
         const indexes = selectedRowCheckBox
            .find((selectRowItem) => selectRowItem.tabName === currentTab)
            .index.sort((a, b) => a - b);

         indexes.forEach((indexItem) => {
            data[
               currentTab === "broad-match"
                  ? "raw_broadmatch_data"
                  : currentTab === "related"
                  ? "raw_related_data"
                  : "raw_question_data"
            ].forEach((rawItem, rawIdx) => {
               if (indexItem === rawIdx) {
                  outlineData.push(rawItem[0]);
               }
            });
         });
         setAddToListItems(
            addToListItems.map((addToListItem) =>
               addToListItem.tabName === currentTab
                  ? { ...addToListItem, outlines: outlineData }
                  : addToListItem,
            ),
         );
      }
      setOutlines(
         addToListItems.map((addToListItem) => addToListItem.outlines).flat(),
      );
   };

   const handleClickRowCheckbox = (rowIdx) => {
      setSelectedRowCheckBox(
         selectedRowCheckBox.map((selectedRowItem) =>
            selectedRowItem.tabName === currentTab
               ? {
                    ...selectedRowItem,
                    index:
                       selectedRowItem.index.length === 0
                          ? [rowIdx]
                          : selectedRowItem.index.includes(rowIdx)
                          ? selectedRowItem.index.filter(
                               (idx) => idx !== rowIdx,
                            )
                          : [...selectedRowItem.index, rowIdx],
                 }
               : selectedRowItem,
         ),
      );
   };

   const getCurrentTabState = () => {
      var url = new URL(window.location.href);
      var page = url.searchParams.get("tab");

      return page;
   };

   const setCurrentTabState = (tab) => {
      setCurrentTab(tab);
      window.history.replaceState(null, null, "?tab=" + tab);
   };

   const getTableData = () => {
      let tableList = [];

      if (currentTab === "broad-match") {
         tableList = data.raw_broadmatch_data;
      } else if (currentTab === "related") {
         tableList = data.raw_related_data;
      } else {
         tableList = data.raw_question_data;
      }

      return tableList;
   };

   const renderIntentItem = (intent, backgroundColor) => {
      return intentMap[intent] ? (
         <div
            style={{ backgroundColor }}
            className="px-2 text-xs text-white rounded-md inline-block"
         >
            {intentMap[intent] ? intentMap[intent].type : "--"}
         </div>
      ) : (
         "--"
      );
   };

   useEffect(() => {
      if (!getCurrentTabState()) {
         setCurrentTabState(tabsOptions[0].tag);
      } else {
         setCurrentTab(getCurrentTabState());
      }
      if (!selectTableRowDetails) {
         setSelectTableRowDetails({
            index: 0,
            details:
               data[
                  getCurrentTabState() === "broad-match"
                     ? "raw_broadmatch_data"
                     : getCurrentTabState() === "related"
                     ? "raw_related_data"
                     : "raw_question_data"
               ][0],
            intent:
               data[
                  getCurrentTabState() === "broad-match"
                     ? "raw_broadmatch_data"
                     : getCurrentTabState() === "related"
                     ? "raw_related_data"
                     : "raw_question_data"
               ]?.[0]?.[2],
            currentTab,
         });
      }
   }, []);

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;

   return (
      <>
         <div>
            <div className="flex items-center space-x-1 text-sm">
               <div className="text-gray-400">Keyword Explorer &#62; </div>
               <div className="text-black">Keyword Overview</div>
            </div>
            <div className="mt-3">
               <div className="flex items-center space-x-1 text-xl font-semiBold ">
                  <div className="text-black">Keyword:</div>
                  <div className="text-gray-400">{data.topic}</div>
               </div>
               <div className="mt-1">
                  <p className="flex items-center text-sm text-black">
                     Database: United States&nbsp;
                     <span>
                        <img
                           className="w-5"
                           src="https://img.icons8.com/color/48/null/usa.png"
                        />
                     </span>
                  </p>
               </div>
            </div>
         </div>
         <hr className="mt-6 mb-5" />

         <div className="max-w-4xl mx-auto">
            <div className="xl:grid xl:grid-cols-2 gap-4 space-y-4 xl:space-y-0">
               <div className="shadow-sm border p-4 rounded-lg bg-white">
                  <div className="text-black">
                     <div className="text-sm">Volume</div>
                     <div className="flex items-center space-x-3">
                        <span className="font-semiBold text-xl">
                           {selectTableRowDetails?.details?.[1]}
                        </span>
                        <span>
                           <img
                              className="w-6"
                              src="https://img.icons8.com/color/48/null/usa.png"
                           />
                        </span>
                     </div>
                  </div>
                  <hr className="mt-3 mb-3" />
                  <div className="text-black">
                     <div className="text-sm">Keyword Difficulty</div>
                     <div className="flex items-center space-x-2 mt-2">
                        <div>
                           <div className="text-xl font-semiBold">
                              {selectTableRowDetails?.details?.[6]} %
                           </div>
                           <div className="text-sm">
                              {
                                 keywordDifficulty(
                                    selectTableRowDetails?.details?.[6],
                                 ).rating
                              }
                           </div>
                        </div>
                        <ReactApexChart
                           options={{
                              chart: {
                                 height: 120,
                                 width: 120,
                                 type: "radialBar",
                              },
                              plotOptions: {
                                 radialBar: {
                                    hollow: {
                                       size: 30,
                                    },
                                    dataLabels: {
                                       show: false,
                                    },
                                    track: {
                                       strokeWidth: 130,
                                    },
                                 },
                              },
                              stroke: {
                                 lineCap: "round",
                              },
                              markers: {
                                 strokeWidth: "100%",
                                 size: 100,
                                 colors: "#000",
                              },
                           }}
                           series={[selectTableRowDetails?.details?.[6]]}
                           type="radialBar"
                           height={120}
                           width={120}
                        />
                     </div>
                     <p className="mt-1 text-sm text-gray-500">
                        {
                           keywordDifficulty(
                              selectTableRowDetails?.details?.[6],
                           ).text
                        }
                     </p>
                  </div>
               </div>
               <div className="grid grid-rows-3 gap-3">
                  <div className="p-4 shadow-sm rounded-lg border bg-white text-black">
                     <div className="text-sm">Intent</div>
                     {renderIntentItem(
                        selectTableRowDetails?.intent,
                        keywordDifficulty(selectTableRowDetails?.details?.[6])
                           .color,
                     )}
                  </div>
                  <div className="p-4 shadow-sm rounded-lg border bg-white text-black">
                     <div className="text-sm">Results</div>
                     <div className="text-xl font-semiBold">
                        {selectTableRowDetails?.details?.[6]
                           ? nFormatter(selectTableRowDetails?.details?.[5])
                           : "--"}
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-4 shadow-sm rounded-lg border bg-white text-black">
                     <div>
                        <div className="text-sm">CPC</div>
                        <div className="text-xl font-semiBold">
                           {selectTableRowDetails?.details?.[3]
                              ? `$ ${selectTableRowDetails?.details?.[3]}`
                              : "--"}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm">Com.</div>
                        <div className="text-xl font-semiBold">
                           {selectTableRowDetails?.details?.[4]
                              ? `$ ${selectTableRowDetails?.details?.[4]}`
                              : "--"}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="xl:flex xl:flex-row flex-col items-center justify-center xl:justify-between mt-4">
               <div className="flex items-center justify-center xl:justify-start mx-auto xl:mx-0 bg-gray-200 space-x-2 rounded-md w-auto max-w-max">
                  {tabsOptions.map((tabItem, idx) => (
                     <button
                        key={idx}
                        className={`${
                           currentTab === tabItem.tag
                              ? "bg-blue-300 border border-blue-500"
                              : "border"
                        } ${
                           idx === 0
                              ? "rounded-l-md"
                              : idx === 2
                              ? "rounded-r-md"
                              : ""
                        } px-3 py-1 text-sm outline-none text-black`}
                        onClick={() => setCurrentTabState(tabItem.tag)}
                     >
                        {tabItem.tabName}
                     </button>
                  ))}
               </div>
               <div className="flex items-center justify-center space-x-2 mt-3 xl:mt-0">
                  <button
                     onClick={handleAddToList}
                     className="bg-primary text-white rounded-md py-1 px-5 text-sm"
                  >
                     Add to list
                  </button>
                  <div className="relative">
                     <button
                        aria-describedby={id}
                        onClick={handleClick}
                        className="bg-primary text-white rounded-md py-1 px-5 text-sm"
                     >
                        Edit Outlines
                     </button>

                     <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "left",
                        }}
                     >
                        <div className="w-96 p-3">
                           <div className="flex items-center justify-between pb-3">
                              <div className="font-semiBold">Edit Outines</div>
                              <IconButton onClick={handleClose}>
                                 <Icon
                                    className="text-red-600 cursor-pointer text-tiny"
                                    icon="akar-icons:cross"
                                 />
                              </IconButton>
                           </div>

                           <div className="space-y-2 mb-4">
                              <div className="text-sm-tiny text-gray-400">
                                 Outlines
                              </div>
                              <ReactDrag
                                 list={outlines}
                                 setList={setOutlines}
                              />
                           </div>

                           <button
                              // onClick={handleAddOutline}
                              className="text-primary border border-primary text-sm w-full text-left px-3 py-2 font-reguler rounded-md"
                           >
                              + Add Outline
                           </button>
                        </div>
                     </Popover>
                  </div>
               </div>
            </div>
            <Table
               data={getTableData()}
               columnNames={data.columnNames}
               setSelectTableRowDetails={setSelectTableRowDetails}
               selectTableRowDetails={selectTableRowDetails}
               selectedRowCheckBox={selectedRowCheckBox}
               handleClickRowCheckbox={(rowIdx) =>
                  handleClickRowCheckbox(rowIdx)
               }
               currentTab={currentTab}
            />
         </div>

         <Toaster />
      </>
   );
};

export default ProjectMain;

const data = {
   topic: "shopping in barcelona",
   country: "us",
   phrase_search: "fullsearch",
   columnNames: [
      "Keyword",
      "Search Volume",
      "Intent",
      "CPC",
      "Competition",
      "Number of Results",
      // "Trends",
      "Keyword Difficulty",
   ],
   raw_related_data: [
      [
         "guide",
         "33100",
         "0",
         "0.64",
         "0.01",
         "14720000000",
         // "0.27,0.27,0.27,0.27,0.27,0.27,0.18,0.18,0.45,1.00,0.27,0.27",
         "11",
      ],
      [
         "search engine",
         "33100",
         "8",
         "0.27",
         "0.16",
         "2080000000",
         // "0.53,0.35,0.28,0.28,0.28,0.43,0.66,0.35,0.82,1.00,1.00,1.00",
         "33",
      ],
      [
         "search engine optimization",
         "33100",
         "0",
         "0.14",
         "0.27",
         "239000000",
         // "0.66,0.14,0.23,0.19,0.52,0.14,0.52,1.00,0.80,0.14,0.66,0.52",
         "28",
      ],
      [
         "seo company",
         "27100",
         "0",
         "0.22",
         "0.12",
         "339000000",
         // "0.21,0.21,0.21,0.14,0.21,0.39,0.59,0.48,1.00,0.88,0.88,0.59",
         "18",
      ],
      [
         "seo services",
         "27100",
         "0",
         "0.09",
         "0.27",
         "347000000",
         // "0.39,0.39,0.72,1.00,1.00,0.01,0.01,0.01,0.01,0.01,0.01,0.01",
         "21",
      ],
   ],
   raw_broadmatch_data: [
      [
         "shopping in barcelona",
         "480",
         "0",
         "0.24",
         "0.12",
         "313000000",
         // "0.21,0.21,0.21,0.14,0.21,0.39,0.59,0.48,1.00,0.88,0.88,0.59",
         "46",
      ],
      [
         "how to open a weed shop in barcelona",
         "320",
         "1",
         "0",
         "0",
         "4800000",
         // "0.39,0.39,0.72,1.00,1.00,0.01,0.01,0.01,0.01,0.01,0.01,0.01",
         "12",
      ],
      [
         "best shopping in barcelona",
         "260",
         "0",
         "0",
         "0.05",
         "314000000",
         // "0.53,0.35,0.28,0.28,0.28,0.43,0.66,0.35,0.82,1.00,1.00,1.00",
         "44",
      ],
      [
         "shopping in barcelona spain",
         "140",
         "0",
         "0.47",
         "0.06",
         "87900000",
         // "0.43,0.43,0.34,0.09,0.43,0.28,0.28,0.15,0.43,1.00,1.00,0.65",
         "44",
      ],
      [
         "best coffee shops in barcelona",
         "90",
         "0",
         "0",
         "0.01",
         "22100000",
         // "0.66,0.14,0.23,0.19,0.52,0.14,0.52,1.00,0.80,0.14,0.66,0.52",
         "26",
      ],
      [
         "luxury shopping in barcelona",
         "70",
         "0",
         "0",
         "0.02",
         "19800000",
         // "0.21,0.21,0.21,0.21,0.21,0.21,0.14,0.78,0.78,0.78,1.00,1.00",
         "24",
      ],
      [
         "tattoo shops in barcelona spain",
         "70",
         "0",
         "0",
         "0.04",
         "4380000",
         // "0.14,0.14,0.14,0.14,0.14,0.52,0.09,0.52,0.52,0.52,0.52,0.09",
         "23",
      ],
      [
         "where to shop in barcelona",
         "70",
         "0",
         "0",
         "0.02",
         "250000000",
         // "0.21,0.21,0.21,0.21,0.21,0.28,0.35,0.35,1.00,1.00,1.00,1.00",
         "36",
      ],
      [
         "best places to shop in barcelona",
         "40",
         "0",
         "0",
         "0.03",
         "0",
         // "0.27,0.27,0.27,0.27,0.27,0.27,0.18,0.18,0.45,1.00,0.27,0.27",
         "42",
      ],
      [
         "is shopping cheap in barcelona",
         "40",
         "0",
         "0",
         "0",
         "21500000",
         // "0.14,0.64,0.14,0.14,0.00,0.35,0.14,0.14,1.00,0.14,0.14,0.14",
         "36",
      ],
   ],
   raw_question_data: [
      [
         "is it expensive to shop",
         "33100",
         "0",
         "0.64",
         "0.01",
         "14720000000",
         // "0.27,0.27,0.27,0.27,0.27,0.27,0.18,0.18,0.45,1.00,0.27,0.27",
         "11",
      ],
      [
         "cheap things in barcelona",
         "33100",
         "8",
         "0.27",
         "0.16",
         "2080000000",
         // "0.53,0.35,0.28,0.28,0.28,0.43,0.66,0.35,0.82,1.00,1.00,1.00",
         "33",
      ],
      [
         "costliest accessories",
         "33100",
         "0",
         "0.14",
         "0.27",
         "239000000",
         // "0.66,0.14,0.23,0.19,0.52,0.14,0.52,1.00,0.80,0.14,0.66,0.52",
         "28",
      ],
      [
         "trending items",
         "27100",
         "0",
         "0.22",
         "0.12",
         "339000000",
         // "0.21,0.21,0.21,0.14,0.21,0.39,0.59,0.48,1.00,0.88,0.88,0.59",
         "18",
      ],
      [
         "jewellery",
         "27100",
         "0",
         "0.09",
         "0.27",
         "347000000",
         // "0.39,0.39,0.72,1.00,1.00,0.01,0.01,0.01,0.01,0.01,0.01,0.01",
         "21",
      ],
   ],
   request_id: "74bf439b-ffc7-493a-b758-1e37c80c5c29",
   status: 200,
   created_date: "2022-11-19T05:39:27.001544",
};
