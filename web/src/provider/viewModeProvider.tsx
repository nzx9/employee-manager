"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ViewModeContext = createContext<{
  viewMode: "grid" | "table";
  toggleViewMode: (viewMode:"grid" | "table" ) => void;
}>({
  viewMode: "grid",
  toggleViewMode: function (viewMode: "grid" | "table"): void {
    throw new Error("Function not implemented.");
  },
});

const ViewModeProvider = ({ children }: { children: JSX.Element }) => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const toggleViewMode = (viewMode: "grid" | "table") => {
    if (viewMode === "grid") setViewMode("table");
    else setViewMode("grid");
  };

  const contextValue = useMemo(
    () => ({
      viewMode: viewMode || "grid",
      toggleViewMode,
    }),
    [viewMode]
  );

  return (
    <ViewModeContext.Provider value={contextValue}>{children}</ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  return useContext(ViewModeContext);
};

export default ViewModeProvider;