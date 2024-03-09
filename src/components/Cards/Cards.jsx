import React from "react";
import { Card, CardFooter, Button } from "@nextui-org/react";

export default function Cards() {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none bg-zinc-700/50 text-zinc-200 h-48 w-48"
    >
      <p className="p-4">card content</p>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <h1 className="text-tiny text-zinc-200">Task title</h1>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
