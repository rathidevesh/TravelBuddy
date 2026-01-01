import React, { useContext, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const Caritem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  const deleteRef = useRef(null);
  const closeRef = useRef(null);

  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${note._id}`, {
      state: {
        carid: note._id,
        carname: note.name,
        cardescription: note.description,
        carcost: note.cost,
        carphoto: note.photo,
      },
    });
  };

  const handleDelete = () => {
    deleteNote(note._id);
    closeRef.current.click();
    showAlert("Car deleted successfully", "success");
  };

  return (
    <>
      {/* DELETE CONFIRMATION MODAL */}
      <button
        ref={deleteRef}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal${note._id}`}
      >
        Delete
      </button>

      <div
        className="modal fade"
        id={`deleteModal${note._id}`}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete{" "}
              <strong>{note.name}</strong>?
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CAR CARD */}
      <div className="col-md-3 mx-5">
        <div className="card mx-3 my-3" style={{ width: "22rem" }}>
          {localStorage.getItem("id") === note.user && (
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "100%", zIndex: "1" }}
            >
              your car
            </span>
          )}

          <img src={note.photo} className="card-img-top1" alt="car" />

          <div className="card-body">
            <h5 className="card-title1">{note.name}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.cartype}</p>
            <p className="card-title1">
              Charges/day : ₹{note.cost}
            </p>

            {/* OWNER ACTIONS */}
            {localStorage.getItem("id") === note.user && (
              <>
                <i
                  className="fa-solid fa-pen-to-square mx-2 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => updateNote(note)}
                ></i>

                <i
                  className="fa-solid fa-trash mx-2 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteRef.current.click()}
                ></i>
              </>
            )}

            {/* CUSTOMER ACTION */}
            {localStorage.getItem("id") !== note.user && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleBookNow}
              >
                Select
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Caritem;
