import Message from "@/components/Message";
import Status from "@/components/Status";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
let socket;
export default function Home() {
  const [Connected, setConnected] = useState(false);
  const [Messages, setMessages] = useState([
    {
      user: "A",
      message: "Hello",
    },
    {
      user: "B",
      message: "Hi",
    },
  ]);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      socket = io("http://192.168.1.175:4000");
    } catch (error) {
      console.log(error);
    }
    socket.on("connect", () => {
      setConnected(true);
      socket.on("message", (msg) => {
        setMessages((prevMessage) => {
          return [...prevMessage, JSON.parse(msg)];
        });
      });
    });
    socket.on("connect_error", (error) => {
      // socket.auth.token = "abcd";
      setError(error);
      // console.log(error);
      socket.connect();
    });
  }, []);
  const [inputMessage, setInputMessage] = useState("");
  const handlerSendMessage = (e) => {
    if (e.key === "Enter") {
      if (inputMessage === "") {
        return;
      }
      if (!Connected) {
        return;
      }
      socket.emit("message", inputMessage);
      setMessages((prevMessage) => {
        return [
          ...prevMessage,
          {
            user: "Me",
            message: inputMessage,
          },
        ];
      });
      setInputMessage("");
    }
  };
  const chatListRef = useRef(null);
  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [Messages]);
  return (
    <div className="min-h-dvh bg-slate-300 flex flex-col">
      <Status Connected={Connected} Error={error} />
      <h1 className="text-center text-3xl py-8 font-bold">Simple Chat Room</h1>
      <div
        ref={chatListRef}
        className="flex-1 p-4  min-[100px]:max-h-[65dvh] min-[400px]:max-h-[70dvh] overflow-scroll"
      >
        <ul>
          {Messages.map((item, index) => {
            return <Message key={index} item={item} />;
          })}
        </ul>
      </div>
      <div className="p-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handlerSendMessage}
          className="min-w-full p-4 border-lime-400 border-dashed rounded shadow focus:ring-2 ring-slate-200"
        ></input>
      </div>
    </div>
  );
}
