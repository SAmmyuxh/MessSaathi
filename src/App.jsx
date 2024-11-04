import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { useState,useEffect,useRef } from 'react'
import menus from './Components/menu'
function App() {
  const [type, settype] = useState("")
  const [time, settime] = useState("00:00")
  const [hostel, setHostel] = useState("BH 1 TO 12")
  const contentref = useRef()
  // const [dayindex, setdayindex] = useState(()=>{
  //   const saveddayindex = localStorage.getItem("dayindex");
  //   return saveddayindex !==null?JSON.parse(saveddayindex):0;
  // });
  // const [weekindex, setweekindex] = useState(()=>{
  //   const savedweekindex = localStorage.getItem("weekindex");
  //   return savedweekindex !== null? JSON.parse(savedweekindex):3;
  // })
  // const [flag, setflag] = useState(() => {
  //   const savedflag = localStorage.getItem("flag");
  //   return savedflag !== null && savedflag !== undefined ? JSON.parse(savedflag) : false;
  // });
  
  // const [tag, settag] = useState(() => {
  //   const savedtag = localStorage.getItem("tag");
  //   return savedtag !== null && savedtag !== undefined ? JSON.parse(savedtag) : false;
  // });
  // const [flag, setflag] = useState(()=>{
  //   const saveflag = localStorage.getItem("flag");
  //   return saveflag !== null ? JSON.parse(saveflag):false;
  // })
  // const [tag, settag] = useState(()=>{
  //   const savetag = localStorage.getItem("flag");
  //   return savetag !== null ? JSON.parse(savetag):false;
  // })
  // const fg = localStorage.getItem("flag") !== null ? JSON.parse(localStorage.getItem("flag")) : false;
  // const [flag, setflag] = useState(fg)
  // const tg = localStorage.getItem("tag") !== null ? JSON.parse(localStorage.getItem("tag")) : false;
  // const [tag, settag] = useState(tg)
  
  // const [flag, setflag] = useState(false)
  // const [tag, settag] = useState(false)
  function getFromSessionStorage(key, defaultValue) {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.warn(`Error parsing JSON from sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  // Initialize state with values from sessionStorage or defaults
  const [dayindex, setdayindex] = useState(() => getFromSessionStorage("dayindex", new Date().getDay()));
  const [weekindex, setweekindex] = useState(() => getFromSessionStorage("weekindex", 1));
  const [flag, setflag] = useState(() => getFromSessionStorage("flag", false));
  const [tag, settag] = useState(() => getFromSessionStorage("tag", false));
 

  // Only update sessionStorage when values change
  useEffect(() => {
    sessionStorage.setItem("dayindex", JSON.stringify(dayindex));
  }, [dayindex]);

  useEffect(() => {
    sessionStorage.setItem("weekindex", JSON.stringify(weekindex));
  }, [weekindex]);

  useEffect(() => {
    sessionStorage.setItem("flag", JSON.stringify(flag));
  }, [flag]);

  useEffect(() => {
    sessionStorage.setItem("tag", JSON.stringify(tag));
  }, [tag]);
  const updatetimeandtype= ()=>{
    let s = new Date();
    const hours = s.getHours();
    const minutes = s.getMinutes();
  
    if ((hours === 7 && minutes >= 0) || (hours === 8) || (hours === 9 && minutes <= 0)) {
      settype("Its Breakfast Time");
    } else if ((hours === 12 && minutes >= 30) || (hours === 13 && minutes >= 0)||(hours===14&&minutes<=30)) {
      settype("its Lunch Time");
    } else if ((hours === 18 && minutes >= 0) || (hours === 19 && minutes <= 30)) {
      settype("Its Snacks Time");
    } else if (
      (hours === 20 && minutes >= 45) || // 8:45 PM or later
      (hours === 21 && minutes <= 15) || // 9:00 PM to 9:15 PM
      (hours === 21 && minutes >= 0) || // 9:00 PM to 9:59 PM
      (hours === 22 && minutes <= 15) // Up to 10:15 PM
    ) {
      settype("Its Dinner Time");
    } else {
      settype("No Food Yet");
    }
  }
  useEffect(() => {
    updatetimeandtype();
   const intervalid = 
    setInterval(updatetimeandtype,60000)

   return ()=> clearInterval(intervalid)
  }, []); // Add dependencies if needed
  
  const updatetimings = ()=>{
    let m = new Date();
    let hours = String(m.getHours()).padStart(2,"0");
    let minutes = String(m.getMinutes()).padStart(2,"0");
    let seconds  = String(m.getSeconds()).padStart(2,"0");
    if ((hours === "07" && minutes >= "00") || (hours === "08") || (hours === "09" && minutes <= "00")) {
      settime("7 to 9")
    } else if((hours === "12" && minutes >= "30") || (hours === "13" && minutes >= "00")||(hours==="14"&&minutes<="30")){
      settime("12:30 to 2:30")
    }else if((hours === "18" && minutes >= "00") || (hours === "19" && minutes <= "30")){
      settime("6:00 to 7:30")
    }else if( (hours === "20" && minutes >= "45") || // 8:45 PM or later
    (hours === "21" && minutes <= "15") || // 9:00 PM to 9:15 PM
    (hours === "21" && minutes >= "00") || // 9:00 PM to 9:59 PM
    (hours === "22" && minutes <= "15")){
      settime("8:45 to 10:15")
    }else{
      if(m.getHours()==12){
        settime(`${hours}:${minutes}:${seconds}`)
      }else{
        settime(`${m.getHours()%12}:${minutes}:${seconds}`)
      }
     
    }
  }
  useEffect(() => {
    updatetimings();
    const intervalid = setInterval(updatetimings,1000)
    return () => {
      clearInterval(intervalid)
    }
  }, [])
  useEffect(() => {
    if (contentref.current &&(flag || tag)) {
      contentref.current.style.backgroundColor = "beige";
    }else{
      contentref.current.style.backgroundColor = "#a7998eda";
    }
  }, [dayindex, weekindex,flag,tag]);
  
   const Toggletomorrow = () => {
    if (!flag) {
      setflag(true);
      if (dayindex === 6) {
        // If it's Sunday, go to Monday of the next week
        setdayindex(0);
        setweekindex(weekindex===3?0:weekindex);
      } else  if(dayindex===0 && weekindex === 3){
       setdayindex(dayindex+1)
       setweekindex(0)     
      }else if(dayindex===0){
      setdayindex(dayindex + 1)
      setweekindex(weekindex+1)
      }
      else{
        setdayindex(dayindex + 1); 
       // Move to the next day within the same week
      }
     
    } else {
      setflag(false);
      if (dayindex === 1 && weekindex ===0) {
        // Moving back to Sunday of the previous week
        setdayindex(0);
        setweekindex(3);
      }else if(dayindex === 1 && weekindex===0){
       setdayindex(0)
       setweekindex(3)
      }else if(dayindex===0){
        setdayindex(6)
      }else if(dayindex ===1){
      setdayindex(0);
      setweekindex(weekindex-1)
      } else {
        setdayindex(dayindex - 1); // Move to the previous day within the same week
      }
    }
  };   
  
  
   useEffect(() => {
      if (dayindex === 1) {
        setweekindex( ((weekindex) % 4)); // Safely update weekindex
      } 
     }, [dayindex])
    
    const Toggleyesterday = () => {
      if (!tag) {
        settag(true);
         if(dayindex===1&&weekindex === 0){
            setdayindex(0);
          setweekindex(3)
        } else if (dayindex === 1) {
          // If it's Monday, go to Sunday of the previous week
          setdayindex(0);
          setweekindex(weekindex === 3 ? 0 : weekindex-1);
        }else if(dayindex === 0){
        setdayindex(6)
        }else {
          setdayindex(dayindex - 1); // Move to the previous day within the same week
        }
      } else {
        settag(false);
       
        if (dayindex === 0) {
          // Move forward to Monday of the next week
          setdayindex(1);
          setweekindex(weekindex === 3?0:weekindex+1);
        } else if(dayindex === 6){
        setdayindex(0)
        }else  {
          setdayindex(dayindex + 1); // Move to the next day within the same week
        }
      }
    };
  return (
    <>
    <div className='relative h-[900px] '>
    <video autoPlay muted loop className='absolute h-[900px] w-full object-cover z-[-1]'>
        <source src='/bgvideo.mp4' type='video/mp4'/>
       </video>
       <div className='relative z-10'>
      <Navbar hostel={hostel} sethostel={setHostel}/>
      </div>
      <div className='flex justify-center items-center h-screen z-10 '>
        <div className='bg-[#a7998eda] md:h-4/6 md:w-3/4 lg:h-[545px] lg:w-[480px] mt-8 w-80 min-[420px]:h-[60%] min-[420px]:w-80  rounded-3xl font-semibold h-fit'  ref={contentref}>
         <div className='flex justify-between '>
          <div className='flex flex-col h-8 p-4 pl-4 '>
            <h3 className='md:text-2xl text-sm'>{type}</h3>
            <h3 className='md:text-2xl text-sm'>Timings:{time}</h3>
          </div>
          <div className='flex flex-col  p-4  pl-4'>
           <h3 className='md:text-xl text-sm'>{menus[hostel][weekindex].week}</h3>
           <h3 className='md:text-xl text-sm'>{menus[hostel][weekindex].days[dayindex].day}</h3>
          </div>
         </div>
         <hr className='w-11/12 border-t-2 border-black ml-5' />
         <div className='flex justify-around mt-2'>
          <u><h4 className='md:text-xl text-xs hover:cursor-pointer'onClick={()=>{Toggleyesterday()}}>{flag?'':tag?<span className='pr-[168px]'>Today's Menu</span>:"←Yesterday's Menu?"}</h4></u>
          <u><h4 className='md:text-xl text-xs hover:cursor-pointer' onClick={()=>{Toggletomorrow()}}>{tag?'':flag? <span className='pl-[200px]'>←Go Back</span>:"See What's Tomorrow?→"}</h4></u>
          {/* <u>
  <h4 className='md:text-xl text-xs hover:cursor-pointer' onClick={() => { setView(view === "yesterday" ? "today" : "yesterday"); updateDayIndex("yesterday"); }}>
    {view === "yesterday" ? "Today's Menu" : "←Yesterday's Menu?"}
  </h4>
</u>
<u>
  <h4 className='md:text-xl text-xs hover:cursor-pointer' onClick={() => { setView(view === "tomorrow" ? "today" : "tomorrow"); updateDayIndex("tomorrow"); }}>
    {view === "tomorrow" ? "←Go Back" : "See What's Tomorrow?→"}
  </h4>
</u> */}
         </div>
         <div className='ml-4 mt-3 md:text-2xl text-sm '>
           <h4>Breakfast</h4>
           <p className='ml-4 mt-1 md:text-lg text-xs  '>{menus[hostel][weekindex].days[dayindex].menu.breakfast}</p>
         </div>
         <div className='ml-4 mt-3 md:text-2xl text-sm '>
           <h4>Lunch</h4>
           <p className='ml-4 mt-1 md:text-lg text-xs'>{menus[hostel][weekindex].days[dayindex].menu.lunch}</p>
         </div>
         <div className='ml-4 mt-3 md:text-2xl text-sm '>
           <h4>Snacks</h4>
           <p className='ml-4 mt-1 md:text-lg text-xs '>{menus[hostel][weekindex].days[dayindex].menu.snacks}</p>
         </div>
         <div className='ml-4 mt-3 md:text-2xl text-sm '>
           <h4>Dinner</h4>
           <p className='ml-4 mt-1 md:text-lg text-xs'>{menus[hostel][weekindex].days[dayindex].menu.dinner}</p>
         </div>
      </div>
      
     </div>
    
</div>
<Footer/>
    </>
  )

}

export default App
