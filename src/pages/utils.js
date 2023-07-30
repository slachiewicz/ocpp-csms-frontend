import { STATION_STATUS } from "@/components/enums";

export const getStatusColor = (status) => {
  if (status === STATION_STATUS.offline) {
    return "#cfd2ce";
  }
  if (status === STATION_STATUS.available) {
    return "orange";
  }
  if (status === STATION_STATUS.charging) {
    return "#66DA26";
  }
  if (status === STATION_STATUS.reserved) {
    return "#2edbfa";
  }
};
