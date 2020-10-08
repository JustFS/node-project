import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import axios from 'axios';

const UpdateProfil = () => {
  const [userData, setUserData] = useState({});

  const uid = useContext(UidContext);

  const getName = async () => {
    await axios({
      method: "get",
      url: "http://localhost:5500/api/user/" + uid,
    })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getName();
  }, []);

  // const getDate = () => {
  //   let date = new Date();
  //   date.setDate(userData.date)
  //   let newDate = date.toISOString().split('T')[0]
  //   return newDate
  // }
  const getDate = () => {
    return userData.date
};

  return (
    <div className="update-container">
      <h3>Inscrit depuis le : </h3>
    </div>
  );
};

export default UpdateProfil;