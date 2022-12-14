import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const ReactDrag = ({ list, setList }) => {
   const [isDragging, setIsDragging] = useState(false);
   const draggingItem = useRef();
   const dragOverItem = useRef();
   const handleDragStart = (e, position) => {
      setIsDragging(true);
      draggingItem.current = position;
      console.log(e.target.innerHTML);
   };

   const handleDragEnter = (e, position) => {
      setIsDragging(true);
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
      const listCopy = [...list];
      console.log(draggingItem.current, dragOverItem.current);
      const draggingItemContent = listCopy[draggingItem.current];
      listCopy.splice(draggingItem.current, 1);
      listCopy.splice(dragOverItem.current, 0, draggingItemContent);

      draggingItem.current = dragOverItem.current;
      dragOverItem.current = null;
      setList(listCopy);
   };

   return (
      <>
         {list.map((item, index) => (
            <div
               onDragStart={(e) => handleDragStart(e, index)}
               onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
               }}
               onDragEnter={(e) => handleDragEnter(e, index)}
               key={index}
               draggable
               className={`${
                  isDragging
                     ? "bg-primary text-white"
                     : "bg-gray-300 text-black"
               } flex items-center justify-between cursor-pointer rounded-md text-tiny py-2 px-3 select-none`}
            >
               <div>{item}</div>
               <Icon
                  className={`${
                     isDragging ? "text-white" : "text-black"
                  } text-xl`}
                  icon="mdi:drag"
               />
            </div>
         ))}
      </>
   );
};

ReactDrag.propTypes = {
   list: PropTypes.array,
   setList: PropTypes.func,
};

export default ReactDrag;
