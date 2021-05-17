import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((old) => {
        old.pop();
        return [...old, newMode];
      });
      setMode(newMode);
      return;
    }

    setHistory((old) => {
      return [...old, newMode];
    });
    console.log("setting mode to", newMode);
    setMode(newMode);
  };

  const back = () => {
    if (mode === initial) {
      return;
    }

    setHistory((old) => {
      old.pop();
      return old;
    });

    setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
}
