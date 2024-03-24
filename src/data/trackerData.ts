import { TrackerColumnDataType, TrackerDataType } from "@/types/TrackerType";

export const trackerData: TrackerDataType[] = [
  {
    status: "PENDING",
    title: "Complete navbar",
    _id: 1,
  },
  {
    status: "PENDING",
    title: "Complete footer",
    _id: 2,
  },
  {
    status: "PENDING",
    title: "Complete hero section",
    _id: 3,
  },
  {
    status: "PENDING",
    title: "Complete App Work",
    _id: 4,
  },
];

export const trackerColumnName: TrackerColumnDataType[] = [
  {
    name: "Pending",
    status: "PENDING",
  },
  {
    name: "In Progress",
    status: "PROGRESS",
  },
  {
    name: "Ready to test",
    status: "READY_TO_TEST",
  },
  {
    name: "Move to prod",
    status: "MOVE_TO_PROD",
  },
];
