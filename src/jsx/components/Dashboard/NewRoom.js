import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { createRoomAction, getRoomsTypesAction, getRoomByIDAction, updateRoomByIDAction } from '../../../store/actions/RoomsActions';
import { Loader } from '../Loader';

const RoomById = ({ getRoomByIDAction, roomsTypes, updateRoomByIDAction, roomById, loadingRoomById, createRoomAction, getRoomsTypesAction }) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoRoom, setInfoRoom] = React.useState({
        name: "",
        number: 1,
        room_type_id: 2,
        created_at: new Date().toLocaleDateString()
    })
    const [id, setId] = React.useState()
    const [isNew, setIsNew] = React.useState(true)

    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        setInfoRoom({ ...infoRoom, [prop]: value })
    }

    useEffect(() => {
        const splitedPathname = location.pathname.split("/")
        const _id = splitedPathname[splitedPathname.length - 1];
        if (_id != "new-room") {
            setId(_id)
            setIsNew(false)
        }
        else setIsNew(true)

    }, [location])

    useEffect(() => {
        if (id) getRoomByIDAction(id)
    }, [id])

    useEffect(() => {
        getRoomsTypesAction();
    }, [])

    // Active pagginarion

    React.useEffect(() => {
        if (roomById && !loadingRoomById && !isNew) setInfoRoom({ ...roomById })
    }, [roomById, loadingRoomById])

    React.useEffect(() => {
        if (isUpdating && !loadingRoomById) navigate("/rooms")
    }, [loadingRoomById])

    const sendForm = () => {
        setIsUpdating(true)
        const newInfoRoom = {...infoRoom}
        delete newInfoRoom.created_at;

        //const roomsType = roomsTypes.find(r => r.id == newInfoRoom.room_type_id)
        //newInfoRoom.room_type_id = roomsType.name;
        // newInfoUser.user_type = userType.name
        // delete newInfoUser.user_type_id

        if (infoRoom.id) updateRoomByIDAction(newInfoRoom)
        else createRoomAction(newInfoRoom)
    }
    const checkIfDisabled = () => {
        let disabled = true;
        if(infoRoom.name && infoRoom.number && infoRoom.room_type_id) disabled = false;
        return disabled
    }
    return (
        <>
            <Tab.Container defaultActiveKey="All" >
                <div className="row form">
                    <div className="col-xl-12">
                        <div className="customCard booking" style={{ heigth: "20px" }} >
                            <div style={{ overflow: "auto" }} className="card-body p-3">
                                <div className="table-responsive overflow-x-hidden">
                                    <div className="dataTables_wrapper no-footer">
                                        {(loadingRoomById) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoRoom.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Number</p>
                                                                        <input value={infoRoom.number} onChange={(e) => changeFormProp("number", e.target.value)} />
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Room Type</p>
                                                                        <select
                                                                            value={infoRoom.room_type_id}
                                                                            className="form-control form-control-lg"
                                                                            onChange={(e) => changeFormProp("room_type_id", Number(e.target.value))}
                                                                        >
                                                                            <option disabled selected>Select an option</option>
                                                                            {roomsTypes.map(u => (
                                                                                <option value={u.id} key={u.id}>{u.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                   
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="mb-3 d-none">
                                                            <input className="form-control" type="file" id="formFile" />
                                                        </div>
                                                        <div>
                                                            <p><b>Comments:</b></p>
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
    // console.log(state, "state PAAA")
    return {
        loadingUserById: state.authData.loadingUserById,
        loadingUserTypes: state.authData.loadingUserTypes,
        userById: state.authData.userByID,
        userTypes: state.authData.userTypes,

        loadingRoomById: state.roomsData.loadingRoomById,
        roomById: state.roomsData.roomById,

        roomsTypes: state.roomsData.roomsTypes,
        loadingRoomsTypes: state.roomsData.loadingRoomsTypes,
    };
};

const mapDispatchToProps = {
    updateRoomByIDAction,
    getRoomByIDAction,
    getRoomsTypesAction,
    createRoomAction
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomById);
