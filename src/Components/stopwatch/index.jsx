import React, { useEffect, useState, useRef } from 'react'
import {
  addMinute,
  addSecond,
  resetMinute,
  resetSecond,
  addHour,
  resetHour,
  addSubSecond,
  resetSubSecond,
  start,
  stop,
  updateLap,
} from "../../reducers/actions";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";

const displayNum = (num) => {
  return num < 10 ? `0${num}` : num;
};
let time;
function Stopwatch() {
  const inputRef = useRef(null);
  const minute = useSelector((state) => state.minutes);
  const subSecond = useSelector((state) => state.subSeconds);
  const second = useSelector((state) => state.seconds);
  const hour = useSelector((state) => state.hours);
  const timer = useSelector((state) => state.timer);
  const lap = useSelector((state) => state.laps);
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
      setIsOpen(!isOpen);
    }
  const [data, setData] = useState();

  function handleClick () {
    setData(inputRef.current.value);
    toggleModal();
  }
  function startTimer() {
    return (time = setInterval(() => {
      dispatch(start());
      dispatch(addSubSecond());
      setSelected("change1");
    }, 10));
  }

  const addLap = () => {
    const newLap = {
      title: data,
      id: lap.length,
      hour: hour,
      minute: minute,
      second: second,
      subSecond: subSecond,
    };
    console.log("lap", lap);
    toggleModal();
    dispatch(updateLap(newLap));
  };

  const reset = () => {
    dispatch(resetHour());
    dispatch(resetMinute());
    dispatch(resetSecond());
    dispatch(resetSubSecond());
    dispatch(resetSubSecond());
    setSelected("change3");
    clearInterval(time);
    dispatch(stop());
  };

  const pause = () => {
    clearInterval(time);
    dispatch(stop());
    setSelected("change2");
  };

  useEffect(() => {
    if (subSecond === 100) {
      dispatch(resetSubSecond());
      dispatch(addSecond());
    }

    if (second === 60) {
      dispatch(addMinute());
      dispatch(resetSecond());
    }

    if (minute === 60) {
      dispatch(addHour());
      dispatch(resetMinute());
    }
  }, [second, subSecond, timer]);

  const renderLaps = lap.map((lap) => (
    <p className="lap" key={lap.id}>
      <span className="lapId">
        {lap.title} {lap.id + 1}
      </span>
      &nbsp;&nbsp;
      {lap.hour > 0 ? lap.hour + " : " : null}
      {lap.minute > 0 ? displayNum(lap.minute) + " : " : null}
      {displayNum(lap.second)}&nbsp;.
      <span className="subSecond">{displayNum(lap.subSecond)}</span>
    </p>
  ));

  if (lap > 0) {
    console.log(
      document.getElementsByClassName("lap-div").lastChild.textContent
    );
  }
      // const [time, setTime] = useState(0);
  const [selected, setSelected] = useState("change1");
  return (
    <div className="stopwatch">
      {hour > 0 ? hour + " : " : null}
      {minute > 0 ? displayNum(minute) + " : " : null} {displayNum(second)}.
      <span className="subSecond">{displayNum(subSecond)}</span>
      <div className="buttons">
        <button
          className={selected === "change1" ? "disabled" : "change1"}
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className={selected === "change2" ? "disabled" : "change1"}
          onClick={pause}
        >
          Pause
        </button>
        <button
          className={selected === "change3" ? "disabled" : "change1"}
          onClick={reset}
        >
          Reset
        </button>
        <button onClick={() => addLap()}>Save</button>
      </div>
      <br />
      <br />
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <div>My modal dialog.</div>
        <input
          ref={inputRef}
          type="text"
          id="message"
          name="message"
          autoComplete="off"
        />
        <button onClick= {handleClick}>Close modal</button>
      </Modal>
      <div className="lap-div">{renderLaps}</div>
    </div>
  );
}

export default Stopwatch