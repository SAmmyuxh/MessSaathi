import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useState, useEffect, useRef } from 'react';
import menus from './Components/menu';

function App() {
  const [type, settype] = useState("");
  const [time, settime] = useState("00:00");
  const [hostel, setHostel] = useState("BH 1 TO 12");
  const contentref = useRef();

  // Helper function to fetch data from sessionStorage
  const getFromSessionStorage = (key, defaultValue) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  };

  // Persistent states
  const [dayindex, setdayindex] = useState(() => getFromSessionStorage("dayindex", new Date().getDay()));
  const [weekindex, setweekindex] = useState(() => getFromSessionStorage("weekindex", 2));
  const [flag, setflag] = useState(() => getFromSessionStorage("flag", false));
  const [tag, settag] = useState(() => getFromSessionStorage("tag", false));

  // Helper to calculate the initial week index based on the current date
  useEffect(() => {
    const updateAndCheckWeek = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
  
      // Retrieve the last updated time from localStorage
      const lastUpdated = localStorage.getItem('lastWeekUpdate');
      const lastUpdateDate = lastUpdated ? new Date(lastUpdated) : null;
  
      // Update if it's Monday at 00:00 and hasn't been updated today
      if (
        day === 1 &&
        hours === 0 &&
        (!lastUpdateDate || lastUpdateDate.getDate() !== now.getDate())
      ) {
        console.log("Week updated at", hours);
        setweekindex((prevWeek) => (prevWeek + 1) % 4);
        localStorage.setItem('lastWeekUpdate', now.toISOString());
      }
    };
  
    const interval = setInterval(updateAndCheckWeek, 60000); // Check every minute
    return () => clearInterval(interval); // Clean up
  }, []);


  // Save states to sessionStorage when they change
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

  const updatetimeandtype = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if ((hours === 7 && minutes >= 0) || hours === 8 || (hours === 9 && minutes <= 0)) {
      if(dayindex === 0){
        if((hours === 8 && minutes >=0) && (hours === 9 && minutes <=30)){
          settype("It's BreakFast time(8:30AM to 9AM)");
        }
      }
      settype("It's Breakfast Time");
    } else if ((hours === 12 && minutes >= 30) || (hours === 13) || (hours === 14 && minutes <= 30)) {
      settype("It's Lunch Time");
    } else if ((hours === 17 && minutes>=30) || (hours === 19 && minutes<=0)) {
      settype("It's Snacks Time");
    } else if ((hours === 20 && minutes >= 30) || hours === 21 || (hours === 22 && minutes <= 15)) {
      settype("It's Dinner Time");
    } else {
      settype("No Food Yet");
    }
  };

  useEffect(() => {
    updatetimeandtype();
    const intervalId = setInterval(updatetimeandtype, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const updatetimings = () => {
    const now = new Date();
    const hours = String(now.getHours() % 12).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    settime(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    updatetimings();
    const intervalId = setInterval(updatetimings, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (contentref.current && (flag || tag)) {
      contentref.current.style.backgroundColor = "beige";
    } else {
      contentref.current.style.backgroundColor = "#a7998eda";
    }
  }, [flag, tag]);

  const Toggletomorrow = ()=>{
    if(!flag){
      setflag(true);
      if(dayindex === 6){
        console.log(dayindex)
        setdayindex(0);
      }else if(dayindex === 0){
        console.log(dayindex)
        setdayindex(1)
        if(weekindex === 3){
          setweekindex(0);
        }else{
          setweekindex(weekindex+1);
        }      
        }else{
          setdayindex(dayindex+1);
        }
      
    }else{
      setflag(false);
      if(dayindex === 0){
        setdayindex(6);
      }else if(dayindex === 1){
        setdayindex(0)
        if(weekindex === 0){
          setweekindex(3);
        }else{
          setweekindex(weekindex-1)
        }
      }else{
        setdayindex(dayindex-1);
      }
      
      
    }
  } 
  const Toggleyesterday = ()=>{
    if(!tag){
      settag(true)
      if(dayindex === 0){
        setdayindex(6)
      }else if(dayindex === 1){
        setdayindex(0)
        if(weekindex === 0){
          setweekindex(3)
        }else{
          setweekindex(weekindex -1)
        }
       
      }else{
        setdayindex(dayindex-1)
      }
     
    }else{
      settag(false)
      if(dayindex === 6){
        setdayindex(0)
      }else if(dayindex === 0){
        setdayindex(1)
        if(weekindex === 3){
          setweekindex(0)
        }else{
          setweekindex(weekindex+1)
        }
        
      }else{
        setdayindex(dayindex+1);
      }
      
    }
  }

  // const Toggletomorrow = () => {
  //   if (!flag) {
  //     setflag(true);
  //     setdayindex((prev) => {
  //       const newDayIndex = (prev + 1) % 7;
  //       if (newDayIndex === 0) {
  //         // Transition to next week if the new day is Monday
  //         setweekindex((prevWeek) => (prevWeek + 1) % 4);
  //       }
  //       return newDayIndex;
  //     });
  //   } else {
  //     setflag(false);
  //     setdayindex((prev) => {
  //       const newDayIndex = (prev - 1 + 7) % 7;
  //       if (newDayIndex === 6) {
  //         // Transition to previous week if the new day is Sunday
  //         setweekindex((prevWeek) => (prevWeek - 1 + 4) % 4);
  //       }
  //       return newDayIndex;
  //     });
  //   }
  // };
  
  // const Toggleyesterday = () => {
  //   if (!tag) {
  //     settag(true);
  //     setdayindex((prev) => {
  //       const newDayIndex = (prev - 1 + 7) % 7;
  //       if (newDayIndex === 6) {
  //         // Transition to previous week if the new day is Sunday
  //         setweekindex((prevWeek) => (prevWeek - 1 + 4) % 4);
  //       }
  //       return newDayIndex;
  //     });
  //   } else {
  //     settag(false);
  //     setdayindex((prev) => {
  //       const newDayIndex = (prev + 1) % 7;
  //       if (newDayIndex === 0) {
  //         // Transition to next week if the new day is Monday
  //         setweekindex((prevWeek) => (prevWeek + 1) % 4);
  //       }
  //       return newDayIndex;
  //     });
  //   }
  // };
  

  return (
    <>
      <div className="relative h-[900px] ">
        <video autoPlay muted loop className="absolute h-[900px] w-full object-cover z-[-1]">
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10">
          <Navbar hostel={hostel} sethostel={setHostel} />
        </div>
        <div className="flex justify-center items-center h-screen z-10 ">
          <div
            className="bg-[#a7998eda] md:h-4/6 md:w-3/4 lg:h-[545px] lg:w-[480px] mt-8 w-80 min-[420px]:h-[60%] min-[420px]:w-80 rounded-3xl font-bold h-fit"
            ref={contentref}
          >
            <div className="flex justify-between ">
              <div className="flex flex-col h-8 p-4 pl-4 ">
                <h3 className="md:text-2xl text-sm">{type}</h3>
                <h3 className="md:text-2xl text-sm">Timings: {time}</h3>
              </div>
              <div className="flex flex-col  p-4  pl-4">
                <h3 className="md:text-xl text-sm">{menus[hostel][weekindex].week}</h3>
                <h3 className="md:text-xl text-sm">{menus[hostel][weekindex].days[dayindex].day}</h3>
              </div>
            </div>
            <hr className="w-11/12 border-t-2 border-black ml-5" />
            <div className="flex justify-around mt-2">
            <u>
  <h4
    className="md:text-xl text-xs hover:cursor-pointer text-[#5a1515]  underline-offset-2 hover:no-underline transition duration-200"
    onClick={Toggleyesterday}
  >
    {flag ? "" : tag ? <span className="pr-[168px]">←Today's Menu</span> : "←Yesterday's Menu?"}
  </h4>
</u>
<u>
  <h4
    className="md:text-xl text-xs hover:cursor-pointer text-[#5a1515]  underline-offset-2 hover:no-underline transition duration-200"
    onClick={Toggletomorrow}
  >
    {tag ? "" : flag ? <span className="pl-[200px]">←Go Back</span> : "See What's Tomorrow?→"}
  </h4>
</u>
            </div>
            <div className="ml-4 mt-3 md:text-2xl text-sm ">
              <h4>Breakfast</h4>
              <p className="ml-4 mt-1 md:text-lg text-xs ">
                {menus[hostel][weekindex].days[dayindex].menu.breakfast}
              </p>
            </div>
            <div className="ml-4 mt-3 md:text-2xl text-sm ">
              <h4>Lunch</h4>
              <p className="ml-4 mt-1 md:text-lg text-xs">{menus[hostel][weekindex].days[dayindex].menu.lunch}</p>
            </div>
            <div className="ml-4 mt-3 md:text-2xl text-sm ">
              <h4>Snacks</h4>
              <p className="ml-4 mt-1 md:text-lg text-xs">{menus[hostel][weekindex].days[dayindex].menu.snacks}</p>
            </div>
            <div className="ml-4 mt-3 md:text-2xl text-sm ">
              <h4>Dinner</h4>
              <p className="ml-4 mt-1 md:text-lg text-xs">{menus[hostel][weekindex].days[dayindex].menu.dinner}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
