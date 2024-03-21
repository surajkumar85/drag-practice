"use client";
import { ComponentPropsWithoutRef } from "react";

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
function Root({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <ComponDivElement
      {...props}
      className={`h-screen w-screen bg-slate-900 flex gap-2 p-3 ${className}`}
    />
  );
}
function Column({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <ComponDivElement
      {...props}
      className={`flex-1 p-3 border rounded-md flex flex-col gap-4 ${className}`}
    />
  );
}

function CardsGroup({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <ComponDivElement
      {...props}
      className={`flex flex-col gap-2 ${className}`}
    />
  );
}
function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <ComponDivElement
      {...props}
      className={`bg-black/30 flex items-center justify-center h-[150px] rounded-md border border-gray-500 cursor-pointer ${className}`}
      draggable={true}
    />
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

export default { Root, Column, ColoumHeading, CardsGroup, Card };
