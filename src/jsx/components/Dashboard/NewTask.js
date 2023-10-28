import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getTaskByID, updateTaskByID, createTask, getTaskTypes } from '../../../store/actions/TasksActions';
import { generateColorFromName, generateLetterByName } from '../../../helpers';
import { Loader } from '../Loader';

const StaffById = ({ getTaskByID, userTypes, updateTaskByID, userById, loadingTaskById, createTask, getTaskTypes }) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoTask, setInfoTask] = React.useState({
        name: "",
        surname: "",
        user_type_id: 1,
        created_at: new Date().toLocaleDateString()
    })
    const [id, setId] = React.useState()
    const [isNew, setIsNew] = React.useState(true)

    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        setInfoTask({ ...infoTask, [prop]: value })
    }

    useEffect(() => {
        const splitedPathname = location.pathname.split("/")
        const _id = splitedPathname[splitedPathname.length - 1];
        if (_id != "new-staff") {
            setId(_id)
            setIsNew(false)
        }
        else setIsNew(true)

    }, [location])

    useEffect(() => {
        if (id) getTaskByID(id)
    }, [id])

    useEffect(() => {
        getTaskTypes()
    }, [])

    // Active pagginarion

    React.useEffect(() => {
        if (userById && !loadingTaskById && !isNew) setInfoTask({ ...userById })
    }, [userById, loadingTaskById])

    React.useEffect(() => {
        if (isUpdating && !loadingTaskById) navigate("/staff")
    }, [loadingTaskById])

    const sendForm = () => {
        setIsUpdating(true)
        const newInfoTask = {...infoTask}
        delete newInfoTask.created_at;
        
        const userType = userTypes.find(u => u.id == newInfoTask.user_type_id)
        newInfoTask.user_type = userType.name
        delete newInfoTask.user_type_id

        if (infoTask.id) updateTaskByID(newInfoTask)
        else createTask(newInfoTask)
    }
    const checkIfDisabled = () => {
        let disabled = true;
        if(infoTask.name && infoTask.surname && infoTask.username && infoTask.user_type_id && infoTask.email && (!isNew || infoTask.password)) disabled = false;
        return disabled
    }
    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">
                    <div className="col-xl-12">
                        <div className="customCard booking" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-3">
                                <div className="table-responsive">
                                    <div className="dataTables_wrapper no-footer">
                                        {(loadingTaskById) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className='imageContainer withLetters' style={{ backgroundColor: `${generateColorFromName(infoTask.name)}` }}>
                                                                <div className='image'>
                                                                    <p>{generateLetterByName(infoTask.name)}{generateLetterByName(infoTask.surname)}</p>
                                                                </div>
                                                            </div>
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoTask.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Suername</p>
                                                                        <input value={infoTask.surname} onChange={(e) => changeFormProp("surname", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Taskname</p>
                                                                        <input value={infoTask.username} onChange={(e) => changeFormProp("username", e.target.value)} />
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Role</p>
                                                                        <select
                                                                            value={infoTask.user_type_id}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("user_type_id", Number(e.target.value))}
                                                                        >
                                                                            {userTypes.map(u => (
                                                                                <option value={u.id} key={u.id}>{u.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    {/* <div onClick={() => openModal()}>
                                                                        <p>Status</p>
                                                                        <input disabled={true} value={infoTask.surname} />
                                                                        <div className={open ? 'formDropDownOptions' : 'formDropDownOptionsClosed'} >
                                                                            <p>Active</p>
                                                                            <p>Inactive</p>
                                                                            <p>On Break</p>
                                                                        </div>

                                                                    </div> */}
                                                                </div>
                                                                <div className='left' >
                                                                    <div>
                                                                        <p>Creation Date</p>
                                                                        <input value={new Date(infoTask.created_at).toLocaleDateString()} disabled="true" />
                                                                    </div>
                                                                    <div>
                                                                        <p>Email</p>
                                                                        <input value={infoTask.email} onChange={(e) => changeFormProp("email", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Password</p>
                                                                        <input type='password' disabled={!isNew} value={!isNew ? "******" : infoTask.password} onChange={(e) => changeFormProp("password", e.target.value)} />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="mb-3 d-none">
                                                            <input className="form-control" type="file" id="formFile" />
                                                        </div>
                                                        <textarea
                                                            className='formTextArea'
                                                            rows="8"
                                                            id="comment"
                                                        ></textarea>
                                                        <div className="col-12">
                                                            <div className='saveContainer mt-2' >
                                                                <button className={ checkIfDisabled() ? "disabled" : ""} disabled={checkIfDisabled()}type="button" onClick={sendForm}>Save</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </Tab.Container >
        </>
    )
}


const mapStateToProps = (state) => {
    console.log(state, "state PAAA")
    return {
        loadingTaskById: state.authData.loadingTaskById,
        loadingTaskTypes: state.authData.loadingTaskTypes,
        userById: state.authData.userByID,
        userTypes: state.authData.userTypes
    };
};

const mapDispatchToProps = {
    getTaskByID,
    getTaskTypes,
    updateTaskByID,
    createTask
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffById);
