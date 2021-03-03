import React, { useState, useEffect } from "react";

function Pending({ pending, approvePending, deletePending }) {
  const { id, name, university, comments, ratings } = pending;

  const handleApprove = () => {
    approvePending(pending, true);
  };

  const handleDelete = () => {
    deletePending(pending);
  };

  return (
    <li id={id}>
      <div>
        <p>{name}</p>
        <p>{university}</p>
        <p>{comments}</p>
        <p>{ratings}</p>
      </div>
      <button onClick={handleApprove}>+</button>
      <button onClick={handleDelete}>del</button>
    </li>
  );
}

export default Pending;
