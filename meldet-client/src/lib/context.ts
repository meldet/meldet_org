
import { Category, Report } from "@prisma/client";
import React from "react";

export interface FilterValues {
  search: string,
  from: Date,
  to: Date,
  categories: string[],
}
export interface IUiContext {
  isMobile: boolean,
  filterValues: FilterValues,
  setFilterValues: (filterValues: Partial<FilterValues>) => void  
}

export const initialFilterValues: FilterValues = {
    search: "test",
    from: new Date("2000-01-01"),
    to: new Date(),
    categories: [],
  }

export const UiContext = React.createContext<IUiContext>({
  isMobile: true,
  filterValues: initialFilterValues,
  setFilterValues: (filterValues: Partial<FilterValues>) => {}
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
  reports: Report[], 
  categories: Category[],
  filteredReports: Report[],
  applyReportsFilter: (v: FilterValues) => void
}> ({
  reports: [],
  categories: [],
  filteredReports: [],
  applyReportsFilter: () => {}
})
