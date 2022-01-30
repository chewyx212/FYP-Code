// import
import DashboardPage from "pages/dashboard/DashboardPage";

import OnboardingPage from "pages/onboarding/OnboardingPage";
import { FiHome, FiPackage, FiUsers } from "react-icons/fi";
import { IconType } from "react-icons";
import ProfilePage from "pages/profile/ProfilePage";
import CustomerPage from "pages/customer/CustomerPage";
import AddCustomerPage from "pages/customer/AddCustomerPage";
import InventoryPage from "pages/inventory/InventoryPage";
import CustomerGroupPage from "pages/customer/CustomerGroupPage";
import SalesReportPage from "pages/sales-report/SalesReportPage";
import AreaPage from "pages/desk/AreaPage";
import AddDeskPage from "pages/desk/AddDeskPage";
import DeskPage from "pages/desk/DeskPage";
import RoomPage from "pages/room/RoomPage";
import RoomSchedulePage from "pages/room/RoomSchedulePage";
import EmployeePage from "pages/employee/EmployeePage";
import VisitorPage from "pages/visitor/VisitorLogPage";
export interface routeType {
  path: string;
  name: string;
  category?: string;
  icon?: IconType;
  component?: any;
  showNav: boolean;
  showSide: boolean;
  views?: routeType[];
  layout: string;
}

const routes: routeType[] = [
  // DASHBOARD
  {
    path: "/",
    name: "Dashboard",
    icon: FiHome,
    component: DashboardPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // ONBOARDING
  {
    path: "/onboarding",
    name: "On Board",
    component: OnboardingPage,
    showNav: false,
    showSide: false,
    layout: "",
  },

  // PROFILE
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  {
    path: "/area",
    name: "Area",
    component: AreaPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/desk",
    name: "Desk",
    component: DeskPage,
    showNav: true,
    showSide: true,
    layout: "/area",
  },
  {
    path: "/add-desk",
    name: "Add Desk",
    component: AddDeskPage,
    showNav: true,
    showSide: true,
    layout: "/area",
  },
  {
    path: "/room",
    name: "Room",
    component: RoomPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/room-schedule",
    name: "Room Schedule",
    component: RoomSchedulePage,
    showNav: true,
    showSide: true,
    layout: "/room",
  },

  {
    path: "/employee",
    name: "Employee",
    component: EmployeePage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/visitor",
    name: "Visitor",
    component: VisitorPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // INVENTORY
  {
    path: "/inventory",
    name: "Inventory",
    icon: FiPackage,
    component: InventoryPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // CUSTOMER
  {
    path: "/customer",
    name: "Customer",
    icon: FiUsers,
    component: CustomerPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/add-customer",
    name: "Add Customer",
    icon: FiUsers,
    component: AddCustomerPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/customer-group",
    name: "Customer Group",
    component: CustomerGroupPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // Sales Report
  {
    path: "/report",
    name: "Report",
    component: SalesReportPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
];
export default routes;
