/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useStore } from '../../store';
import Task from '../task/Task';
import './Column.css';
import classNames from 'classnames';
//import { shallow } from 'zustand/shallow';

export default function Column({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );
  const addTasks = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={classNames('column', {
        drop,
      })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={() => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                addTasks(text, state);
                setOpen(false);
                setText('');
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
