"use client";
import { trackerColumnName } from "@/data/trackerData";
import Tracker from "./Tracker";
import { useEffect, useState } from "react";
import { TrackerDataType } from "@/types/TrackerType";

const TRACKER_KEY = "trackerData";

export default function TrackerPage() {
  const [trackerData, setTrackerData] = useState<TrackerDataType[]>(
    JSON.parse(localStorage.getItem(TRACKER_KEY) || "[]") || []
  );
  useEffect(() => {
    localStorage.setItem(TRACKER_KEY, JSON.stringify(trackerData));
  }, [trackerData]);
  return (
    <Tracker.Root setTrackerData={setTrackerData} trackerData={trackerData}>
      {trackerColumnName.map((column, index) => (
        <Tracker.Column key={index} columnStatus={column.status}>
          <Tracker.ColoumHeading>{column.name}</Tracker.ColoumHeading>
          {column.status === "PENDING" && <Tracker.AddNewTicket />}
          <Tracker.CardsGroup columnStatus={column.status}>
            {trackerData
              .filter((itemData) => itemData.status === column.status)
              .map((itemData) => (
                <Tracker.Card
                  columnStatus={itemData.status}
                  key={itemData._id}
                  cardId={itemData._id}
                >
                  {itemData.title}
                </Tracker.Card>
              ))}
          </Tracker.CardsGroup>
        </Tracker.Column>
      ))}
      <Tracker.DeleteBlock>Drop here to delete</Tracker.DeleteBlock>
    </Tracker.Root>
  );
}
