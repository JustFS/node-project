import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadBio } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const errors = useSelector((state) => state.errorReducer.userErrors);
  const uid = useContext(UidContext);

  const isUpdated = () => setUpdateForm(!updateForm);

  const handleUpdate = () => {
    dispatch(uploadBio(userData._id, bio));
    setUpdateForm(false);
  };

  useEffect(() => {
    if (uid) dispatch(getUser(uid));
    dispatch(getUsers());
  }, [uid]);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="" />
          <UploadImg userData={userData} />
          <p>{errors.maxSize}</p>
          <p>{errors.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm !== true && (
              <>
                <p onClick={isUpdated}>{userData.bio}</p>
                <button onClick={isUpdated}>Modifier Bio</button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <br />
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements : {userData.following ? userData.following.length : "0"}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData.followers ? userData.followers.length : "0"}
          </h5>
        </div>
      </div>
      {followingPopup && <div className="popup-profil-container">
        <div className="modal">
          <h3>Abonnements</h3>
          <span className="cross" onClick={() => setFollowingPopup(false)}>&#10005;</span>
          <ul>
            {usersData.map((user) => {
              for (let i = 0; i < userData.following.length; i++) {
                if (user._id === userData.following[i]) {
                  return (
                    <li key={user._id}>
                      <img src={user.picture} alt="user-pic" />
                      <h4>{user.pseudo}</h4>
                      <div className="follow-handler">
                        <FollowHandler
                          idToFollow={user._id}
                          type={"suggestion"}
                        />
                      </div>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </div>
      </div>}
      {followersPopup && <div className="popup-profil-container">
        <div className="modal">
          <h3>Abonnements</h3>
          <span className="cross" onClick={() => setFollowersPopup(false)}>&#10005;</span>
          <ul>
            {usersData.map((user) => {
              for (let i = 0; i < userData.followers.length; i++) {
                if (user._id === userData.followers[i]) {
                  return (
                    <li key={user._id}>
                      <img src={user.picture} alt="user-pic" />
                      <h4>{user.pseudo}</h4>
                      <div className="follow-handler">
                        <FollowHandler
                          idToFollow={user._id}
                          type={"suggestion"}
                        />
                      </div>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default UpdateProfil;
