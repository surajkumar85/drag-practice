"use client";
import Tracker from "./Tracker";

export default function TrackerPage() {
  return (
    <Tracker.Root>
      <Tracker.Column>
        <Tracker.ColoumHeading>Pending</Tracker.ColoumHeading>
        <Tracker.CardsGroup>
          <Tracker.Card>Item 1</Tracker.Card>
          <Tracker.Card>Item 2</Tracker.Card>
          <Tracker.Card>Item 3</Tracker.Card>
        </Tracker.CardsGroup>
      </Tracker.Column>
      <Tracker.Column>
        <Tracker.ColoumHeading>In Progress</Tracker.ColoumHeading>
      </Tracker.Column>
      <Tracker.Column>
        <Tracker.ColoumHeading>Ready to test</Tracker.ColoumHeading>
      </Tracker.Column>
      <Tracker.Column>
        <Tracker.ColoumHeading>Move to prod</Tracker.ColoumHeading>
      </Tracker.Column>
    </Tracker.Root>
  );
}
