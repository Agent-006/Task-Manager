import React from "react";
import { Card, CardFooter } from "@nextui-org/react";
import CardDropdown from "../CardDropdown/CardDropdown";

export default function Cards({...task }) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none bg-zinc-700/50 text-zinc-200 h-48 w-48"
    >
      <p className="p-4">{task.description}</p>
      <p className="p-4 pb-14"> - {task.content}</p>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <h1 className="text-tiny text-zinc-200">{task.title}</h1>
        <CardDropdown {...task} />
      </CardFooter>
    </Card>
  );
}
