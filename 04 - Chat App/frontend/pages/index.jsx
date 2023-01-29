import Head from "next/head";
import Image from "next/image";
import { Inter, Ma_Shan_Zheng } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addMsg,
  chatlist,
  createMessage,
  retrievechat,
} from "../lib/slices/chat";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import {BiSend} from 'react-icons/bi'
import { flushSync } from "react-dom";

export default function Home() {
  const chats_list = useSelector((state) => state.chatReducer?.chats);
  const msgs = useSelector((state) => state.chatReducer?.chat?.messages);
  const refreshToken = useSelector((state) => state.authReducer?.refresh);
  const user = useSelector((state) => state.authReducer?.user);
  const chat = useSelector((state) => state.chatReducer?.chat);
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const socket = useRef();
  const messageContainer = useRef()
  const list = async () => {
    try {
      await dispatch(chatlist()).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    list();
  }, []);

  const msgList = async (id) => {
    try {
      await dispatch(retrievechat(id)).unwrap();
      flushSync()
      messageContainer.current.scrollTo({
        top: messageContainer.current.scrollHeight,
        behavior: 'smooth'
      })
      // await dispatch(retrievechat({id: id})).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const createMsg = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createMessage({ text: value, chat: chat.id })).unwrap(); // await dispatch(retrievechat({id: id})).unwrap();
      setValue("");
    } catch (e) {
      console.error(e);
    }
  };

  const newMessageReceived = useCallback(
    (e) => {
      console.log(e);
      const msg = JSON.parse(e.data);
      if (msg.type == "chat_message") {
        if (msg.message.chat == chat.id) {
          flushSync(() => {
            dispatch(addMsg(msg.message));
          })
          messageContainer.current.scrollTo({
            top: messageContainer.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      }

      // addMsg()
    },
    [chat.id, dispatch]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && socket.current)
      socket.current.addEventListener("message", newMessageReceived);

    return () => {
      if (typeof window !== "undefined" && socket.current)
        socket.current.removeEventListener("message", newMessageReceived);
    };
  }, [chat.id, newMessageReceived]);

  const startSocket = () => {
    if (!refreshToken || socket.current) return;
    const sock = new WebSocket(`ws://localhost:8000/ws/chat/`);
    socket.current = sock;
    sock.onopen = () => {
      sock.send(
        JSON.stringify({
          type: "login",
          refresh_token: refreshToken,
        })
      );
    };

    sock.onclose = (e) => {
      // stopSocket()
      setTimeout(startSocket(), 1000);
    };
  };

  const stopSocket = () => {
    if (socket.current) socket.current.close();
    socket.current = null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") startSocket();

    return () => {
      if (typeof window !== "undefined") stopSocket();
    };
  }, [refreshToken]);
  return (
    <div className="w-full h-full flex flex-row overflow-hidden">
      <div className="border-0 border-r border-solid border-gray-400 flex flex-col basis-[20%] p-2 gap-4">
        <div className="flex justify-center items-center">
          <input
            className="basis-[70%] rounded-full bg-slate-400 placeholder:text-white px-4 py-2 text-white focus:text-black focus:bg-slate-200 focus:border-2 focus:placeholder:text-slate-500 focus-visible:border-slate-400 focus-visible:outline-none transition-all duration-200"
            placeholder="Search..."
          ></input>
        </div>

        <div className="flex flex-col justify-start gap-2">
          {chats_list?.map((ch) => (
            <button
              key={ch.id}
              className={`flex flex-row gap-2 group  active:bg-slate-300 ${chat.id == ch.id ? 'bg-teal-400' : '' } rounded-lg p-1`}
              onClick={() => msgList(ch.id)}
            >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="rounded-full aspect-square w-[50px] overflow-hidden relative">
                    <Image
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="fill"
                      src={
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2FZCK2X.png&f=1&nofb=1&ipt=b20373f7f0207bc004dec402050fc9f0159ed3252d4cf85fc0421948df3dc2ed&ipo=images"
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-lg">{ch.name}</div>
                  <div className="text-sm ">last_message....</div>
                </div>
            </button>
          ))}
        </div>
      </div>
      <div className="relative   flex-grow p-4 overflow-hidden">
        <div className="w-full h-full flex flex-col gap-2 overflow-auto pb-12" ref={messageContainer}>
          {msgs?.map((msg) => (
            <div className={`flex flex-col justify-center ${user?.phone_number == msg.user.phone_number ? "items-end":"items-start"} gap-2`} key={msg.id}>
              <span className="text-sm text-gray-400">{msg.user.first_name}</span>
              <span className={`${user?.phone_number == msg.user.phone_number ? "bg-emerald-300" : "bg-green-200"} rounded-xl p-3 max-w-[80%] md:min-w-[400px]`}>{msg.text}</span>
            </div>
          ))}
        </div>
        <form className="absolute flex gap-2 bottom-0 right-0 left-0 p-4" onSubmit={createMsg}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-grow transition-all duration-150 rounded-lg p-2 h-10 border border-solid border-gray-400 outline-none focus:border-zinc-800 hover:border-stone-400"
          ></input>
          <button type="submit" className="rounded-lg w-10 transition-all duration-150 flex justify-center items-center text-white bg-emerald-600 hover:bg-emerald-400 active:scale-95">
          <BiSend />
          </button>
        </form>
      </div>
    </div>
  );
}
