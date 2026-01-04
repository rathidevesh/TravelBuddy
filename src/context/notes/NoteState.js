import React,{ useState }  from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host ="http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
   const [loading, setLoading] = useState(false);
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    setLoading(true);
    const response = await fetch(`${host}/api/rent/fetchallcars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
    const json = await response.json() 
    setNotes(json)
    setLoading(false);
  }

  // Add a Note
  const addNote = async (name, description, cost ,cartype, photo ) => {
    setLoading(true);
    console.log("Loading Started with value " , loading);
    await new Promise(resolve => setTimeout(resolve, 1200));
    const response = await fetch(`${host}/api/rent/addcar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name,description,cost,cartype,photo})
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    setLoading(false);
    console.log("Loading Ended with value " , loading);
    return true;
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    setLoading(true);
    const response = await fetch(`${host}/api/rent/deletecar/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    setLoading(false);
  }

  // Edit a Note
  const editNote = async (id, name, description, cost ,cartype, photo) => {
    // API Call 
    setLoading(true);
    const response = await fetch(`${host}/api/rent/updatecar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name, description, cost ,cartype, photo})
    });
    const json = await response.json(); 

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].name = name;
        newNotes[index].description = description;
        newNotes[index].cost = cost; 
        newNotes[index].cartype = cartype; 
        newNotes[index].photo= photo ;
        break; 
      }
    }  
    setNotes(newNotes);
    setLoading(false);
  }

  const bookinInitial = []
  const[bookings,setbookings] = useState([])

  const getallbookings = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/Bookingsroute/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Pass the token retrieved from localStorage
      },
    });
    console.log(response)
    const json = await response.json();
    
    setbookings(json);
    setLoading(false);
    console.log(bookings);
  };
  
  // useEffect(() => {
  //   console.log(bookings);
  // }, [bookings]);
  


// Without Payment
  // const getbookings = async(bookeduser,car_id,mobileNumber,startDate,  endDate , carname ,carcost,carphoto) => {
  //   setLoading(true);
  //   const response = await fetch ('http://localhost:5000/api/Bookingsroute/bookcar', {
  //       method : 'POST',
  //       headers : {
  //         'Content-Type': 'application/json',
  //         "auth-token": localStorage.getItem('token')
  //       },
  //       body: JSON.stringify({bookeduser,car_id,mobileNumber,startDate,  endDate , carname ,carcost,carphoto})
  //   });
  //   const bookingcars = await response.json();
  //   setbookings(bookings.concat(bookingcars))
  //   setLoading(false);
  // }

  const getbookings = async (paymentResponse, bookingData) => {
  setLoading(true);

  const response = await fetch(
    "http://localhost:5000/api/Bookingsroute/bookcar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        bookingData,
      }),
    }
  );

  const result = await response.json();

  if (result.success) {
    setbookings(bookings.concat(result.booking));
  }

  setLoading(false);
};

  return (
    <NoteContext.Provider value={{loading,notes,bookings,addNote,deleteNote,editNote,getNotes,getbookings,getallbookings}}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;


