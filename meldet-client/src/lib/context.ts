
import { Category } from "@prisma/client";
import React from "react";
import { ReportWithCat } from "./uiDataFetching";

export interface FilterValues {
  search: string,
  from: Date,
  to: Date,
  categories: string[],
}
export interface IUiContext {
  isMobile: boolean,
  filterValues: FilterValues,
  setFilterValues: (filterValues: FilterValues) => void  
}

export const initialFilterValues: FilterValues = {
    search: "",
    from: new Date("2000-01-01"),
    to: new Date(),
    categories: [],
  }

export const UiContext = React.createContext<IUiContext>({
  isMobile: true,
  filterValues: initialFilterValues,
  setFilterValues: (filterValues: FilterValues) => {}
//   isNavigationOpen: false,
//   toggleNavigation: () => {},
//   isFilterOpen: false,
//   toggleFilter: () => {},
//   isReportPanelOpen: false,
//   toggleReportPanel: () => {},
//   textFilterValue: '',
//   setTextFilterValue: () => {},
//   categoryFilter: [],
//   setCategoryFilter: () => {},
//   startDateFilter: '',
//   setStartDateFilter: () => {},
//   endDateFilter: '',
//   setEndDateFilter: () => {},
});

export const DataContext = React.createContext<{
  reports: ReportWithCat[], 
  categories: Category[],
  filteredReports: ReportWithCat[],
  applyReportsFilter: (v: FilterValues) => void
  selectedReports: ReportWithCat[],
  applySelectedReports: (r: ReportWithCat[]) => void
}> ({
  reports: [],
  categories: [],
  filteredReports: [],
  applyReportsFilter: () => {},
  selectedReports: [],
  applySelectedReports: () => {}
})
