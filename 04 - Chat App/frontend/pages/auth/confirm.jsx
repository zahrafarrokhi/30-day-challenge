import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { confirm, login } from '../../lib/slices/auth';
import VerificationInput from "react-verification-input";
import { GrRefresh } from "react-icons/gr";

export default function Login() {
  const [code, setCode] = useState("");
  // timer (setInterval)
  const [time, setTime] = useState(120);
  const timerRef = useRef(null);
  const phone = useSelector(state=>state.authReducer?.phone_number)
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timerInterval = setInterval(() => {
      // setTime(time - 1) // This is wrong because time is state and on every call will have the same value
      if (time > 0) setTime((t) => (t > 0 ? t - 1 : t));
      else clearInterval(timerRef.current);
    }, 1000);
    timerRef.current = timerInterval;
  };

  useEffect(() => {
    startTimer();
    // unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

 
  const dispatch = useDispatch();
  const router = useRouter()
   const submit =async()=>{
    try {
      await dispatch(confirm({phone_number:phone, otp: code})).unwrap()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center gap-4 w-42 h-[400px] bg-purple-400 p-8 rounded-lg shadow-xl '>
       <div className="m-3 flex  flex-row justify-between ">
        Enter the code sent to {phone}
      </div>
      <div className="my-24 md:my-4">
        <VerificationInput
          length={4}
          placeholder=""
          validChars="0-9۰-۹"
          removeDefaultStyles
          autoFocus
          dir="ltr"
          classNames={{
            container: `flex flex-row justify-center h-[45px] w-[200px] md:w-[260px] md:h-[50px]`,
            character: `flex justify-center items-center rounded-lg m-1 border border-border border-solid `,
            characterInactive: `rounded-lg m-1 border border-border `,
            characterSelected: `rounded-lg m-1 border border-borderColor  `,
          }}
          value={code}
          onChange={(e) => setCode(e)}
        />
      </div>       
       <button onClick={submit} className="rounded-full bg-purple-900 text-white text-bold p-2 my-4">submit   </button>

       <div className="m-3 flex  flex-row justify-between ">
          <div
            className={`flex text-sm ${
              time === 0 ? "text-primary" : "text-textSecondaryDark"
            } cursor-pointer `}
            // onClick={resendCode}
            disabled={time !== 0}
          >
            Resend Code
          </div>
          <div className="flex items-center ">
            <GrRefresh className="w-[25px] h-[25px] p-[5px]" />
            {/* 90/60 = 1.5 => floor(1.5) -> 1 =>str(1)=>'1 */}
            {/* '1'.padStart(2, '0') = '01' */}
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {/*90 %60 =>30 =>'30' =>   */}
            {/* 01:30*/}
            {String(time % 60).padStart(2, "0")}
          </div>
        </div>
        
      </div>
    </div>
  )
}
