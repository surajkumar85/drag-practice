"use client";
import { InitialState, StatusType, TrackerDataType } from "@/types/TrackerType";
import {
  ComponentPropsWithoutRef,
  DragEvent,
  FormEvent,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const TrackerContext = createContext<InitialState | null>(null);
const useTrackerContext = () => useContext<InitialState | null>(TrackerContext);

function ComponDivElement({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={` ${className}`}>
      {children}
    </div>
  );
}
function Root({
  setTrackerData,
  trackerData,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & InitialState) {
  return (
    <TrackerContext.Provider value={{ setTrackerData, trackerData }}>
      <ComponDivElement
        {...props}
        className={`h-screen w-screen bg-slate-900 flex gap-2 p-3 ${className}`}
      />
    </TrackerContext.Provider>
  );
}
function Column({
  columnStatus,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { columnStatus: StatusType }) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setTrackerData, trackerData } = useTrackerContext()!;

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    highlightIndicator(event);
    setIsActive(true);
  }

  function highlightIndicator(event: DragEvent<HTMLDivElement>) {
    const indicators = getAllIndicators();
    clearIndicator(indicators as any);
    const ele = getNearestIndicator(event, indicators);
    if (ele?.element) {
      ele.element.style.opacity = "1";
    }
  }

  function clearIndicator(indicators?: HTMLDivElement[]) {
    const elems = indicators || (getAllIndicators() as HTMLDivElement[]);
    elems.forEach((indi) => {
      indi.style.opacity = "0";
    });
  }

  function getNearestIndicator(
    event: DragEvent<HTMLDivElement>,
    indicators: Element[]
  ) {
    const DISTANCE_OFFSET = 50;
    const ele = indicators.reduce(
      (closest: any, child) => {
        const box = child.getBoundingClientRect();
        const offset = event.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return ele;
  }

  function getAllIndicators() {
    return Array.from(
      document.querySelectorAll(`[data-coloum="${columnStatus}"]`)
    );
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    clearIndicator();
    setIsActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    clearIndicator();
    setIsActive(false);
    const cardId = Number(event.dataTransfer.getData("cardId"));

    const indicators = getAllIndicators();
    const { element } = getNearestIndicator(event, indicators);

    const before = Number(element.dataset.before || "-1");
    if (before !== cardId) {
      let copyOfTickets = [...trackerData];
      let cardToTransfer = copyOfTickets.find((c) => c._id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status: columnStatus };
      copyOfTickets = copyOfTickets.filter((c) => c._id !== cardId);

      const moveToBack = before === -1;
      if (moveToBack) {
        copyOfTickets.unshift(cardToTransfer);
      } else {
        const inserAtIndex =
          copyOfTickets.findIndex((ele) => ele._id === before) + 1;
        if (inserAtIndex === undefined) return;
        copyOfTickets.splice(inserAtIndex, 0, cardToTransfer);
      }
      setTrackerData(copyOfTickets);
    }

    // setTrackerData(
    //   trackerData.map((data) => {
    //     if (data._id === cardId) {
    //       return { ...data, status: columnStatus };
    //     }
    //     return data;
    //   })
    // );
  }

  return (
    <ComponDivElement
      {...props}
      className={`flex-1 p-3 rounded-md overflow-scroll flex flex-col gap-4 ${
        isActive && "bg-gray-700"
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  );
}

function CardsGroup({
  columnStatus,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { columnStatus: StatusType }) {
  return (
    <ComponDivElement {...props} className={`flex flex-col gap-1 ${className}`}>
      <DropIndicator beforeId="-1" coloumStatus={columnStatus} />
      {children}
    </ComponDivElement>
  );
}
function Card({
  columnStatus,
  cardId,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  cardId: number;
  columnStatus: StatusType;
}) {
  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("cardId", `${cardId}`);
  }
  return (
    <>
      <ComponDivElement
        {...props}
        className={`bg-black/30 flex items-center justify-center p-2 min-h-[70px] rounded-md border border-gray-500 cursor-pointer ${className}`}
        draggable={true}
        onDragStart={handleDragStart}
      />
      <DropIndicator beforeId={`${cardId}`} coloumStatus={columnStatus} />
    </>
  );
}
function ColoumHeading({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <ComponDivElement
      {...props}
      className={` text-[12px] bg-gray-800 p-2 text-center rounded uppercase font-semibold ${className}`}
    />
  );
}

function DeleteBlock({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setTrackerData, trackerData } = useTrackerContext()!;

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsActive(false);
    const cardId = Number(event.dataTransfer.getData("cardId"));
    setTrackerData(trackerData.filter((data) => data._id !== cardId));
  }

  return (
    <ComponDivElement
      {...props}
      className={`flex-1 p-3 border border-gray-600 rounded-md flex items-center justify-center ${
        isActive ? "bg-red-400 text-black/50" : "text-white/50"
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  );
}

function AddNewTicket() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [ticketValue, setTicketValue] = useState<string>("");
  const { setTrackerData, trackerData } = useTrackerContext()!;
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!ticketValue) return;

    const newTicket: TrackerDataType = {
      _id: new Date().getTime(),
      status: "PENDING",
      title: ticketValue,
    };
    setTrackerData([newTicket, ...trackerData]);
    setTicketValue("");
    setIsActive(false);
  }

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div>
      {isActive ? (
        <form onSubmit={handleSave}>
          <label>
            <textarea
              ref={inputRef}
              value={ticketValue}
              onChange={(e) => setTicketValue(e.target.value)}
              className="text-white w-full rounded-md bg-black/30 border border-gray-500 outline-none p-2"
            />
          </label>
          <div className="flex items-center gap-2 justify-end">
            <button
              className="text-red-500 border-red-500 border p-2 px-4 rounded bg-red-500/15"
              onClick={() => {
                setIsActive(false);
                setTicketValue("");
              }}
            >
              cancel
            </button>
            <button
              className="text-white border-green-500 bg-green-500 px-4 border p-2 rounded "
              type="submit"
            >
              save
            </button>
          </div>
        </form>
      ) : (
        <button
          className="text-white/50 hover:text-white border border-white/50 hover:border-white w-full p-2 rounded border-dashed"
          onClick={() => setIsActive(true)}
        >
          Add
        </button>
      )}
    </div>
  );
}

function DropIndicator({
  beforeId,
  coloumStatus,
}: {
  coloumStatus: StatusType;
  beforeId: string;
}) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-coloum={coloumStatus}
      className="h-0.5 w-full bg-blue-700 rounded-md opacity-0"
    ></div>
  );
}

export default {
  Root,
  Column,
  ColoumHeading,
  CardsGroup,
  Card,
  DeleteBlock,
  AddNewTicket,
} as const;
