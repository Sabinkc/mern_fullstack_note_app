import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},

        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      if (response.status == "200") {
        navigate("/login");
      } else {
        alert("Unable to logut");
      }
    } catch (err) {
      alert("Unable to logout");
    }
  }

  async function createNote(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/notes/createNote",
        {
          title: title,
          description: description,
        },
        {
          withCredentials: true,
        },
      );
      getNotes();
      if (response.status == 201) {
        alert("Note created successfully");
        setTitle("");
        setDescription("");
      } else {
        alert("Unable to create note");
      }
    } catch (err) {
      alert(err);
    }
  }
  async function getNotes() {
    const response = await axios.get(
      "http://localhost:3000/api/notes/getAllNotes",
      {
        withCredentials: true,
      },
    );
    console.log(response.data.notes);
    const fetchedNotes = response.data.notes;
    setNotes(fetchedNotes);
    console.log(notes);
  }

  async function deleteNotes(noteId) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/notes/deleteNote/${noteId}`,
        {
          withCredentials: true,
        },
      );
      if (response.status == 200) {
        alert("Note deleted successfully");
      } else {
        alert("Unable to delete note");
      }
      getNotes();
    } catch (err) {
      alert("Unable to delte note");
    }
  }

  async function logout() {}

  useEffect(() => {
    getNotes();
    console.log("notes:" + notes);
  }, []);

  return (
    <div className="flex bg-blue-300 h-screen w-full">
      <form className="flex flex-col justify-center items-center h-full w-1/2 gap-5">
        <h1 className="text-2xl">Create your note</h1>
        <h2>Enter your note title</h2>
        <input
          onChange={function (e) {
            setTitle(e.target.value);
            console.log(title);
          }}
          className="bg-white"
          type="text"
          value={title}
        />
        <h2>Enter your note description</h2>
        <textarea
          onChange={function (e) {
            setDescription(e.target.value);
            console.log(description);
          }}
          className="bg-white"
          type="text"
          value={description}
        />
        <button
          onClick={function (e) {
            createNote(e);
          }}
          className="bg-red-500 rounded px-3 py-1"
        >
          Create Note
        </button>
      </form>
      <div className="h-full w-1/2 bg-red-500 p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl ">Your notes</h1>
          <button
            onClick={function () {
              logoutUser();
            }}
            className="bg-white rounded px-2 py-1"
          >
            Logout
          </button>
        </div>
        <div className="flex gap-5 flex-wrap">
          {notes.map((note) => {
            return (
              <div
                key={note._id}
                className="bg-white rounded h-50 w-50 flex justify-between flex-col p-5"
              >
                <p>{note.title}</p>
                <hr />
                <p>{note.description}</p>Í
                <hr />
                <div className="flex justify-center items-center">
                  <button
                    onClick={function () {
                      deleteNotes(note._id);
                    }}
                    className="bg-red-500 rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
