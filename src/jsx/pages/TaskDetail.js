// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Dropdown } from 'react-bootstrap';

// //images
// import room4 from './../../images/room/room4.jpg';

// const DropdownBlog = () => {
//     return (
//         <>
//             <Dropdown className="dropdown dropend ms-auto">
//                 <Dropdown.Toggle as="div" className="btn-link i-false">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
//                         <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
//                         <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
//                     </svg>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                     <Dropdown.Item>Edit</Dropdown.Item>
//                     <Dropdown.Item>Delete</Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//         </>
//     )
// }

// const TaskDetail = () => {
//     const [selectBtn, setSelectBtn] = useState("Newest"); return (
//         <>
//             <div className="row mt-4">
//                 <div className="col-xl-12">
//                     <div className="row">
//                         <div className="col-xl-12">
//                             <div className="card overflow-hidden">
//                                 <div className="card-body taskDetailCard">
//                                     <div className='detailImage' >
//                                         <img src={room4} className='rounded'></img>
//                                         <div className='inputs' >
//                                             <div> Facility</div>
//                                             <input placeholder='Kitchen'></input>
//                                             <div className='buttons' >
//                                                 <div className='detailButton'>
//                                                     <button></button>
//                                                     <p>
//                                                         Cleaning
//                                                     </p>
//                                                 </div>
//                                                 <div className='detailButton' >
//                                                     <button></button>
//                                                     <p>
//                                                         Maintainance
//                                                     </p>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default TaskDetail