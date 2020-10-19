import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UidContext } from "../AppContext";
import { NavLink } from "react-router-dom";

const NewQuoteForm = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState([]);
  const [following, setFollowing] = useState(Number);
  const [followers, setFollowers] = useState(Number);

  const uid = useContext(UidContext);

  const handleForm = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: {
        userId: uid,
        message,
      },
    })
      .then((res) => setMessage(""))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getUserData = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/` + uid,
      })
        .then((res) => {
          setUserData(res.data);
          setFollowing(res.data.following.length);
          setFollowers(res.data.followers.length);
        })
        .catch((err) => console.log(err));
    };
    getUserData();
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
