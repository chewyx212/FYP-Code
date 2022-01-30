export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Passcode: undefined;
  Home: undefined;
  Order: {
    orderType: number;
    tableId?: number;
    pax?: number;
    orders?: any[];
    refresher: Function;
  };
  Table: undefined;
  Printer: undefined;
  Camera: undefined;
  Member: undefined;
  Menu: undefined;
  Transaction: undefined;
  Setting: undefined;
  Payment: {
    order: any;
  };

  TableSetting: undefined;
  TableCategorySetting: undefined;
  GlobalSetting: undefined;
  StaffSetting: undefined;
  AccountSetting: undefined;

  OfficeHome: undefined;
  OfficeProfile: undefined;
  OfficeLanding: undefined;
  OfficeAnnouncement: undefined;
  OfficeAnnouncementDetail: undefined;
  OfficeDesk: {
    areaId: string;
  };
  OfficeDeskList: undefined;
  OfficeAddDesk: {
    deskId: string;
  };
  OfficeArea: undefined;
  OfficeRoom: undefined;
  OfficeRoomList: undefined;
  OfficeBranch: undefined;
  OfficeSchedule: undefined;
  OfficeAddRoomSchedule: {
    roomId: string;
  };
  OfficeCheck: undefined;
  OfficeCheckIn: undefined;
  OfficeCheckInResult: {
    branchId: string;
  };
};
