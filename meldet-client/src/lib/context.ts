import { Category } from "@prisma/client";
import React from "react";
import { Viewport } from "../components/Map";
import { ReportWithCat } from "./uiDataFetching";

export interface FilterValues {
  search: string;
  from: Date;
  to: Date;
  categories: string[];
}
export interface IUiContext {
  filterValues: FilterValues;
  viewport: Viewport;
  setUiState: React.Dispatch<
    React.SetStateAction<{
      filterValues: FilterValues;
      viewport: Viewport;
    }>
  >;
}

export const initialFilterValues: FilterValues = {
  search: "",
  from: new Date("2000-01-01"),
  to: new Date(),
  categories: [],
};

// Viewport settings center on Gent, hardcoded
// TODO use browser location to set initial viewport
export const initialViewport: Viewport = {
  longitude: 3.720367,
  latitude: 51.053075,
  zoom: 13,
  pitch: 0,
  bearing: 0,
  transitionDuration: 500,
};

export const UiContext = React.createContext<IUiContext>({
  filterValues: initialFilterValues,
  viewport: initialViewport,
  setUiState: () => {},
});

export const IsMobileContext = React.createContext({isMobile: true})

export const DataContext = React.createContext<{
  reports: ReportWithCat[];
  categories: Category[];
  filteredReports: ReportWithCat[];
  applyReportsFilter: (v: FilterValues) => void;
  selectedReports: ReportWithCat[];
  applySelectedReports: (r: ReportWithCat[]) => void;
}>({
  reports: [],
  categories: [],
  filteredReports: [],
  applyReportsFilter: () => {},
  selectedReports: [],
  applySelectedReports: () => {},
});
