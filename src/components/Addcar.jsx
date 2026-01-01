import React,{useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Addcar.css';
import Loader from "./Loader";

const Addcar = (props) => {
  const context = useContext(NoteContext);
  
  const {loading , addNote} = context;
  const navigate = useNavigate(); // Initialize the useNavigate hook

 
  const [note, setNote] = useState({ name: '', description: '', cost: '',cartype:'', photo: '' });

  const handleClick = async (e) => {
  e.preventDefault();

  await addNote(
    note.name,
    note.description,
    note.cost,
    note.cartype,
    note.photo
  );

  setNote({ name: '', description: '', cost: '', cartype:'', photo: '' });

  props.showAlert("Added Successfully", "success");

  navigate('/home'); // 👈 navigation AFTER loader ends
};


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
   if(loading){
    return <Loader />
  }

    return (
        <div className="addcaritem">

                <div class="card4">
                        <h4 className='mx-3 my-2'>Add Your Vehicle Details</h4>
                        <div className="card-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Vehicle Name</label>
                                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={note.name} onChange={onChange} minLength={3} required /> 
                                    <div id="emailHelp" class="form-text"> *vehicle name along with model expected.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                                    <div id="Help" class="form-text"> *vehicle condition along with distance travelled yet ecpected.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cost" className="form-label">Rate (Rs/day)</label>
                                    <input type="text" className="form-control" id="cost" name="cost" value={note.cost} onChange={onChange} required />
                                    <div id="Help" class="form-text"> *Verified by administration. For more info - click on RateChart</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cost" className="form-label">Vehicle Type</label>
                                    <input type="text" className="form-control" id="cartype" name="cartype" value={note.cartype} onChange={onChange} required />
                                    <div id="Help" class="form-text"> *Sedan / SUV / MPV / Bike - one from these four.</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Image URL</label>
                                    <input type="text" className="form-control" id="photo" name="photo" value={note.photo} onChange={onChange} required />
                                    <div id="Help" class="form-text"> *Only url of the vehicle expected</div>
                                </div>
                            
                                <button disabled={note.name.length<3 || note.description.length<5} type="submit" className="btn btn-light" onClick={handleClick}>Add Vehicle</button>
                            </form>
                        </div>
                </div>

                <div className="advertise">
                    <h4>News Updates </h4>
                        <div class="card5 mb-3" style={{width:"25rem"}}>
                        <div class="row g-0">
                            <div class="col-md-6">
                            <img src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20230628013800_BMW%201.jpg&w=736&h=488&q=75&c=1" class="img-fluid rounded-start" alt="Img"/>
                            </div>
                            <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">BMW M 1000 RR launch</h5>
                                <p class="card-text">Limited units of this homologation series will go on sale here, making it the most powerful and expensive motorcycle</p>
                            </div>
                            </div>
                        </div>
                        </div>
                            
                    
                        <div class="card5 mb-3" style={{width:"25rem"}} >
                        <div class="row g-0">
                            <div class="col-md-6">
                            <img src="https://imgd.aeplcdn.com/664x374/n/cw/ec/144851/exter-exterior-right-front-three-quarter-4.jpeg?isig=0&q=75" class="img-fluid rounded-start" alt="Img"/>
                            </div>
                            <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">Hyundai Exter</h5>
                                <p class="card-text">Rs. 6.00 - 10.00 LakhEstimated Price.10th Jul 2023Expected Launch</p>
                            </div>
                             </div>
                             </div>
                        </div>

                        <div class="card5 mb-3" style={{width:"25rem"}}>
                        <div class="row g-0">
                            <div class="col-md-6">
                            <img src="https://imgd.aeplcdn.com/664x374/n/cw/ec/135051/seltos-facelift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=75" class="img-fluid rounded-start" alt="Img"/>
                            </div>
                            <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">Kia Seltos Facelift</h5>
                                <p class="card-text">Rs. 11.00 - 19.00 LakhEstimated Price. 4th Jul 2023Unveil Date</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            
        </div>
    )
}

export default Addcar