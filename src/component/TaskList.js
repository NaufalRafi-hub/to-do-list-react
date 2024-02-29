// TaskList.js
import React from 'react';
import { AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
const TaskList = ({ tasks, onDelete, onEdit }) => {
  // console.log (tasks);
  return (
    <div>
      {tasks.map((task) => (
        // <li key={task.id}>
          <Accordion defaultActiveKey='0' key={task.id}>
            <AccordionItem eventKey={task.id} >          
          {console.log(task.id)}
              <AccordionHeader>
                {task.judul}
              </AccordionHeader>
              <AccordionBody>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {task.deskripsi}
                  <div>
                    <button onClick={() => onEdit(task)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                  </div>
                </div>
                
              </AccordionBody>
            </AccordionItem>
          </Accordion>
         
        // </li>
      ))}
    </div>
  );
};

export default TaskList;
