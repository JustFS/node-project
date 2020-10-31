import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { getUser } from "../../actions/user.actions";
import { timestampParser } from "../Utils";

const NewQuoteForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const userData = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState();

  const uid = useContext(UidContext);

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (postPicture) {
        data.append("file", file);
      }
      data.append("video", video);

      await dispatch(addPost(data));
      setMessage("");
      setPostPicture("");
      setVideo("");
      setFile("");
      dispatch(getPosts());
    } else {
      alert("Veuillez entrez un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  const handleVideo = () => {
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(" "));
        setPostPicture("");
      }
    }
  };

  useEffect(() => {
    if (playOnce) {
      dispatch(getUser(uid)).then(() => setIsLoading(false));
      setPlayOnce(false);
    }
    handleVideo();
  }, [uid, video, message]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              cols="25"
              rows="2"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>publié le {timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {postPicture ? (
                  <button onClick={() => setPostPicture("")}>
                    Supprimer image
                  </button>
                ) : (
                  <>
                    <i className="fas fa-image" htmlFor="file-upload"></i>
                    <input
                      id="file-upload"
                      type="file"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button onClick={cancelPost}>Annuler message</button>
                ) : null}
                <button onClick={handlePost}>Envoyer</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewQuoteForm;
