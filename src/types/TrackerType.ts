import { Dispatch, SetStateAction } from "react";

export type StatusType =
  | "PENDING"
  | "PROGRESS"
  | "READY_TO_TEST"
  | "MOVE_TO_PROD";

export type ColumnType =
  | "Pending"
  | "In Progress"
  | "Ready to test"
  | "Move to prod";

export type TrackerDataType = {
  title: string;
  status: StatusType;
  _id: number;
};

export type TrackerColumnDataType = {
  name: ColumnType;
  status: StatusType;
};

export type InitialState = {
  trackerData: TrackerDataType[];
  setTrackerData: Dispatch<SetStateAction<TrackerDataType[]>>;
};
