import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { chatlist } from "../lib/slices/chat";
import { useEffect } from "react";

export default function Home() {
  const chats_list = useSelector((state) => state.chatReducer?.chats);
  const dispatch = useDispatch();

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
  return (
    <div className="w-full h-full flex flex-row">
      <div className="border-0 border-r border-solid border-gray-400 flex flex-col basis-[15%] p-2 gap-4">
        <div className="flex justify-center items-center">
          <input
            className="basis-[70%] rounded-full bg-slate-400 placeholder:text-white px-4 py-2 text-white focus:text-black focus:bg-slate-200 focus:border-2 focus:placeholder:text-slate-500 focus-visible:border-slate-400 focus-visible:outline-none transition-all duration-200"
            placeholder="Search..."
          ></input>
        </div>

        <div className="flex flex-col justify-start gap-2">
          {chats_list?.map((chat) => (
            <div key={chat.id} className="flex flex-col gap-2 group hover:bg-slate-300 rounded-lg p-1">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col items-center justify-center">
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
                  <div className="text-lg">{chat.name}</div>
                  <div className="text-sm ">last_message....</div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
