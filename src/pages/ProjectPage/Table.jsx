import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

import { intentMap } from "utils/data";
import { HtmlTooltip } from "theme/styles";
import { keywordDifficulty, nFormatter } from "utils/helpers";

const Table = (props) => {
   const {
      data,
      columnNames,
      setSelectTableRowDetails,
      handleClickRowCheckbox,
      currentTab,
      selectedRowCheckBox,
      selectTableRowDetails,
   } = props;

   const renderIntentItem = (intent) => {
      let intentDetails = intentMap[intent];
      let style = {
         backgroundColor: intentDetails.color.bg,
         color: intentDetails.color.text,
         "&:hover": intentDetails.color.hover,
      };
      return (
         <HtmlTooltip title={<p>{intentDetails["hover-text"]}</p>}>
            <div style={style} className="w-5 text-sm-tiny rounded-md">
               {intentDetails.type[0]}
            </div>
         </HtmlTooltip>
      );
   };

   return (
      <>
         {data.length > 0 && (
            <div className="overflow-x-auto relative shadow-sm rounded border border-gray-300 mt-5">
               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-sm-tiny text-gray-700 bg-gray-50 dark:text-gray-400 border-b border-gray-300">
                     <tr>
                        <th
                           scope="col"
                           className="py-1 px-5 border-r border-gray-300"
                        >
                           <div className="flex items-center">
                              <input
                                 id="checkbox-all-search"
                                 type="checkbox"
                                 className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                              />
                              <label
                                 for="checkbox-all-search"
                                 className="sr-only"
                              >
                                 checkbox
                              </label>
                           </div>
                        </th>
                        {columnNames.map((column, columnIdx) => (
                           <th
                              key={column}
                              scope="col"
                              className={`${
                                 columnIdx === 0 ? "text-left" : "text-center"
                              } py-1 px-6 border-r border-gray-300`}
                           >
                              <div className="flex items-center justify-center whitespace-nowrap">
                                 <div>{column}</div>
                                 {column !== "Keyword" &&
                                    column !== "Intent" && (
                                       <IconButton
                                          size="small"
                                          focusRipple={true}
                                       >
                                          <SortRoundedIcon fontSize="small" />
                                       </IconButton>
                                    )}
                              </div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                     {data.map((item, itemIdx) => (
                        <tr
                           onClick={() =>
                              setSelectTableRowDetails({
                                 index: itemIdx,
                                 details: item,
                                 intent: item[2],
                                 currentTab,
                              })
                           }
                           key={itemIdx}
                           className={`${
                              selectTableRowDetails &&
                              selectTableRowDetails?.index === itemIdx &&
                              currentTab === selectTableRowDetails?.currentTab
                                 ? "bg-gray-200"
                                 : "bg-white hover:bg-gray-50"
                           } border-b text-black cursor-pointer`}
                        >
                           <td className="py-2 px-5 w-4">
                              <div className="flex items-center">
                                 <input
                                    onClick={() =>
                                       handleClickRowCheckbox(itemIdx)
                                    }
                                    checked={selectedRowCheckBox.some(
                                       (selectedRowItem) =>
                                          selectedRowItem.tabName ===
                                             currentTab &&
                                          selectedRowItem.index.includes(
                                             itemIdx,
                                          ),
                                    )}
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                 />
                                 <label
                                    for="checkbox-table-search-1"
                                    className="sr-only"
                                 >
                                    checkbox
                                 </label>
                              </div>
                           </td>
                           <th
                              scope="row"
                              className="py-3 px-6 font-medium whitespace-nowrap"
                           >
                              {item[0]}
                           </th>
                           <td className="py-3 px-6 font-medium text-center">
                              {item[1]}
                           </td>
                           <td className="flex items-center justify-center py-3 px-6 font-medium text-center">
                              {intentMap[item[2]]
                                 ? renderIntentItem(item[2])
                                 : "--"}
                           </td>
                           <td className="py-3 px-6 font-medium text-center">
                              {item[3]}
                           </td>
                           <td className="py-3 px-6 font-medium text-center">
                              {item[4]}
                           </td>
                           <td className="py-3 px-6 font-medium text-center">
                              {item[5] ? nFormatter(item[5]) : "--"}
                           </td>
                           <td className="flex items-center justify-center space-x-1 py-3 px-6 font-medium text-center">
                              <div>{item[6]}</div>
                              <div
                                 style={{
                                    backgroundColor: keywordDifficulty(item[6])
                                       .color,
                                 }}
                                 className="w-3 h-3 bg-black rounded-full"
                              ></div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </>
   );
};

Table.propTypes = {
   columnNames: PropTypes.array,
   setSelectTableRowDetails: PropTypes.func,
};

export default Table;
