import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function ButtonWithIcon({ icon, title, to }) {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <button className={`flex gap-x-4 items-center `} onClick={() => navigate(to)}>
      {icon}
      <p className={`${location.pathname == to ? "text-orange-500" : "text-black"}`}>{title}</p>
    </button>
  );
}
