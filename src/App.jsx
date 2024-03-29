import { AddTask, Cards, Login, Nav, SignUp } from "./components";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const isUpdatedTask = useSelector((state) => state.auth.isUpdatedTask);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await fetch("http://localhost:8000/api/v1/tasks/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        });

        const responseData = await response.json();
        setTasks(responseData.data);
      })();
    }
  }, [userData, isUpdatedTask]);

  return (
    <NextUIProvider>
      <div className="relative bg-zinc-900 h-screen w-full text-white overflow-x-hidden">
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
            <div className="w-full h-full absolute z-10 flex flex-wrap justify-start gap-5 pt-16 px-5">
              {isLoggedIn ? (
                <>
                  {tasks.map((task) => (
                    <div key={task._id}>
                      <Cards {...task} />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="absolute flex top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-2">
                    <Login />
                    <SignUp />
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
