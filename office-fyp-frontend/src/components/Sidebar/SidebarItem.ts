
import { FiHome, FiShoppingCart, FiPackage, FiUsers, FiBarChart2 } from "react-icons/fi";
import { IconType } from "react-icons";
import { GiTable } from "react-icons/gi";

export interface SidebarType {
  name: string;
  link: string;
  icon: IconType;
  subNav: SubNavType[];
}
export interface SubNavType {
  name: string;
  link: string;
}

const routes: SidebarType[] = [
  { name: "Dashboard", icon: FiHome, link: "/", subNav: [] },
  {
    name: "Desk",
    icon: GiTable,
    link: "/area",
    subNav: [],
  },
  {
    name: "Room",
    icon: FiShoppingCart,
    link: "/room",
    subNav: [
      {
        name: "Room",
        link: "/room",
      },
      {
        name: "Room Schedule",
        link: "/room/room-schedule",
      },
    ],
  },
  {
    name: "Employee",
    icon: FiUsers,
    link: "/employee",
    subNav: [],
  },

  {
    name: "Visitor",
    icon: FiUsers,
    link: "/visitor",
    subNav: [],
  },
  // {
  //   name: "Room",
  //   icon: FiShoppingCart,
  //   link: "/order",
  //   subNav: [
  //     {
  //       name: "Room",
  //       link: "/room",
  //     },
  //     {
  //       name: "Pending Order",
  //       link: "/",
  //     },
  //     {
  //       name: "Abnormal Order",
  //       link: "/abnormal-order",
  //     },
  //   ],
  // },
  // {
  //   name: "Inventory",
  //   icon: FiPackage,
  //   link: "/inventory",
  //   subNav: [
  //     {
  //       name: "Inventory Management",
  //       link: "/inventory",
  //     },
  //   ],
  // },
  // {
  //   name: "Employee",
  //   icon: FiUsers,
  //   link: "/customer",
  //   subNav: [],
  // },
  // {
  //   name: "Report",
  //   icon: FiBarChart2,
  //   link: "/report",
  //   subNav: [],
  // },
];

export default routes;
