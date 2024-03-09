import { useState } from "react";
import { AddTask, Cards, Login, Nav } from "./components";

import { NextUIProvider } from "@nextui-org/react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NextUIProvider>
      <div className="relative bg-zinc-900 h-screen w-full text-white">
        <h1 className="text-zinc-950 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-7xl font-extrabold z-10">
          Task Manager
        </h1>
        <div className="w-full h-screen absolute z-20">
          <div className="w-full h-full relative">
            <div className="w-full absolute z-20">
              <Nav />
            </div>
            <div className="w-20 absolute right-14 bottom-12 z-20">
              <AddTask />
            </div>
            <div className="w-full h-full absolute z-10 flex flex-wrap gap-5 pt-16 px-5">
              {isLoggedIn ? (
                <>
                  <Cards />
                  <Cards />
                </>
              ) : (
                <>
                  <div className="absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Login />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
