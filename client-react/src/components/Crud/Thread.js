import React, { useState, useEffect, useDispatch, useSelector } from "react";
import Cards from "./Cards";
import { connect } from 'react-redux';
import { getData } from "../../actions/getData";

export const Thread = () => {
  const thread = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const [thread, setThread] = useState();

  useEffect(() => {

  });

  return (
    <div className="thread-container">
      <ul>

        {/* {thread && thread.map((card) => <Cards card={card} key={card._id} />)} */}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.user.posts,
});

const mapDispatchToProps = { getData };

export default connect(mapStateToProps, mapDispatchToProps)(posts)