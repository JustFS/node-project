import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts, getUser } from "../../actions/actionsRoot";

const NewQuoteForm = () => {
  const [message, setMessage] = useState("");
  const [posterPic, setPosterPic] = useState("");
  const [posterPseudo, setPosterPseudo] = useState("");
  const [following, setFollowing] = useState(Number);
  const [followers, setFollowers] = useState(Number);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const uid = useContext(UidContext);

  const handleForm = async (e) => {
    e.preventDefault();

    await dispatch(addPost(uid, message, posterPic, posterPseudo));
    dispatch(getPosts());
    setMessage("");
  };

  useEffect(() => {
    dispatch(getUser(uid));
  }, [uid]);

  return (
    <div className="post-container">
      <div className="data">
        <p>
          <span>{following}</span> Abonnement{following > 1 ? "s" : null}
        </p>
        <p>
          <span>{followers}</span> Abonné{followers > 1 ? "s" : null}
        </p>
      </div>
      <NavLink exact to="/profil">
        <div className="user-info">
          <img src={userData.picture} alt="user-img" />
          <h3>{userData.pseudo}</h3>
        </div>
      </NavLink>
      <form onSubmit={handleForm} className="post-form">
        <textarea
          name="message"
          id="message"
          cols="25"
          rows="2"
          placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default NewQuoteForm;
