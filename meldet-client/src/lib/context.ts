
import { Category, Report } from "@prisma/client";
import React from "react";

export const UiContext = React.createContext({
  isMobile: true,
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
  categories: Category[]
}> ({
  reports: [],
  categories: []
})
