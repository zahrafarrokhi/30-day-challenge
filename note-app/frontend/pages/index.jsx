import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createNote, deleteNotes, listNotes, update } from "../lib/slices/note";
import { useEffect, useState } from "react";
import { SlClose } from 'react-icons/sl'



const Card = (props)=>{
  const {note,del}=props
  const [edit,setEdit]=useState(false)
  // load prev title =>note.title
  const [title,setTitle]=useState(note.title)
  //load prev text => note.description
  const [text,setText]=useState(note.description)

  const cancelEdit = () => {
    setEdit(false)
    setTitle(note.title)
    setText(note.description)
  }


  const dispatch = useDispatch()
  
  // save => requset for updating
  const save = async () => {
    try {
      await dispatch(update({id:note.id,title,description:text})).unwrap()
      setEdit(false)
    } catch (error) {
      
    }
  }

    return(
      <div className=" basis-[45%] max-w-[calc(50%-1em)] flex-grow bg-teal-600 rounded-lg shadow-sm flex flex-col p-4 gap-2 self-start">
        {edit?
        <>
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border-0 border-b border-solid border-gray-400 focus:border-green-400 bg-transparent focus-visible:outline-0 text-white"
            placeholder="Title"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="active:border-0 focus:border-0 p-2 bg-transparent placeholder:text focus-visible:outline-0 text-white"
            rows={6}
            placeholder="My note..."
          />

        </>
        :
        <>
        <h4  className="font-bold text-lg">{note?.title}</h4>
        <p className="flex flex-grow break-all whitespace-normal">{note?.description.split('\n').map(x => <>{x}<br/></>)}</p>
        </>
        }
      
      <div className="flex gap-2">
        {edit ? <>
          <button className="rounded-full border-2 border-solid border-white active:opacity-50 p-1 px-2 text-sm" onClick={cancelEdit}>
          Cancel
        </button>
        <button className="rounded-full border-2 border-solid border-green-400 text-green-400 active:opacity-50 p-1 px-2 text-sm" onClick={save}>
          Save
        </button>
        </>: <button className="rounded-full border-2 border-solid border- active:opacity-50 p-1 px-2 text-sm" onClick={()=>setEdit(true)}>
          Edit
        </button>}
        <button className="rounded-full border-2 border-solid border-red-700 text-red-700 font-bold active:opacity-50 p-1 px-2 text-sm"  onClick={()=>del(note.id)}>
          Delete
        </button>
      </div>
    </div>
    )
}
const Modal = (props) => {
  const { open, setOpen, children, className } = props;
  // if(!open) return <></>
  return (
    <>
      {open && (
        <div
          className="flex flex-col justify-center items-center fixed inset-0  bg-slate-700 bg-opacity-40 z-50 backdrop-blur-md"
          // onClick={() => setOpen(false)}
        >
          <div
            className={`bg-white rounded-lg min-w-[300px] flex flex-col relative ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}

          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  // error
  const [error,setError] =useState(false)
  // search
  const [search,setSearch] =useState("")
  //modal
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };

  // redux
  const dispatch = useDispatch();
  // create
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
    if (newTitle.length < 5) {
      setTitleError("Title must be at least 5 characters")
    } else setTitleError("")
  }

  const updateText = (newText) => {
    setText(newText);
    if (newText.length < 5) {
      setTextError("Description must be at least 5 characters")
    } else setTextError("")
  }

  const create = async () => {
    try {

      await dispatch(createNote({ title: title, description: text })).unwrap();
      setTitle("")
      setText("")
      setModal(false);
    } catch (error) {}
  };

  // list
  const notes = useSelector((state) => state.noteReducer?.notes);
  const list = async () => {
    try {
      await dispatch(listNotes({
        search
       })).unwrap();
    } catch (error) {}
  };
  // loading  page => load previous Tasks
  useEffect(() => {
    list();
  }, [search]);
 
// delete
const del =  async(id)=>{
  try {
    await dispatch(deleteNotes({id})).unwrap()
  } catch (error) {
    
  }
  
}
  return (
    <div className={`flex flex-col min-h-screen text-white  ${modal ? "bg-gray-800" : "bg-gray-900"} [*]:transition-all [*]:duration-150`}>
      <Head>
        <title>My note app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-0 border-b border-solid border-gray-400 flex flex-row justify-between p-4 ">
        <h1>Note</h1>
        <div className="flex flex-row items-center gap-2 p-2 border rounded-lg border-solid border-gray-400 focus:border-green-400 bg-transparent focus-visible:outline-0 text-white">
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-transparent focus-visible:outline-0"
            placeholder="Search..."
          />
          <BsSearch ></BsSearch>
        </div>
      </header>

      <main className=" relative flex flex-col gap-4 p-4 flex-grow">
        <div className="flex flex-row flex-wrap gap-4">
        {/* {notes.filter(item=>item.title.toLowerCase().includes(search.toLowerCase())||item.description.toLowerCase().includes(search.toLowerCase())).map((note) => ( */}
        {/* {notes.filter(item=>`${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase())).map((note) => ( */}
        {notes.map((note) => (
          <Card note={note} key={note.id} del={del}></Card>
         
        ))}
        </div>


        <button
          onClick={openModal}
          className="flex items-center justify-center text-lg rounded-full aspect-square shadow-2xl shadow-black absolute bottom-4 right-4 bg-teal-400 p-4 active:bg-teal-300 shadow-sm"
        >
          <AiOutlinePlus />
        </button>
        <Modal
          open={modal}
          setOpen={setModal}
          className={
            "!bg-zinc-900 min-w-[500px] max-w-[95%] p-6 gap-2 flex-col flex"
          }
        >
          <div className="flex flex-row items-center justify-end gap-2">
          <button className="text-white text-lg" onClick={() => setModal(false)}>
            <SlClose />
          </button>
          </div>
          <input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            type="text"
            className="border-0 border-b border-solid border-gray-400 focus:border-green-400 bg-transparent focus-visible:outline-0 text-white"
            placeholder="Title"
          />
          {titleError && <h6 className="text-rose-600">* {titleError}</h6>}
          <textarea
            value={text}
            onChange={(e) => updateText(e.target.value)}
            type="text"
            className="active:border-0 focus:border-0 p-2 bg-transparent placeholder:text focus-visible:outline-0 text-white"
            rows={6}
            placeholder="My note..."
          />
          {textError && <h6 className="text-rose-600">* {textError}</h6>}

          <div className="flex flex-row justify-end gap-2">
           <button
              onClick={create}
              className="flex items-center justify-center text-sm rounded-lg py-2 px-4 shadow-2xl shadow-black bg-teal-400 p-4 active:bg-teal-300 shadow-sm disabled:active:bg-teal-400 disabled:bg-opacity-30 disabled:active:bg-opacity-30 "
              disabled={!title || !text}
            >
              Add
            </button>
          </div>
        </Modal>
      </main>

      <footer className="flex flex-row items-center justify-start p-4 border-0 border-t border-solid border-gray-400">
        <a
          href="https://github.com/zahrafarrokhi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Z
        </a>
      </footer>
    </div>
  );
}
