import React, { useState, useEffect } from "react";

export default function useApplicationData(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return {};
}
