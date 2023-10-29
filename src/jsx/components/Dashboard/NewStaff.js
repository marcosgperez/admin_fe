import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getUserByIDAction, updateUserByIDAction, createUserAction, getUserTypesAction } from '../../../store/actions/AuthActions';
import { generateColorFromName, generateLetterByName } from '../../../helpers';
import { Loader } from '../Loader';

const StaffById = ({ getUserByIDAction, userTypes, updateUserByIDAction, userById, loadingUserById, createUserAction, getUserTypesAction }) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoUser, setInfoUser] = React.useState({
        name: "",
        surname: "",
        user_type_id: 1,
        created_at: new Date().toLocaleDateString()
    })
    const [id, setId] = React.useState()
    const [isNew, setIsNew] = React.useState(true)

    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        setInfoUser({ ...infoUser, [prop]: value })
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
        if (id) getUserByIDAction(id)
    }, [id])

    useEffect(() => {
        getUserTypesAction()
    }, [])

    // Active pagginarion

    React.useEffect(() => {
        if (userById && !loadingUserById && !isNew) setInfoUser({ ...userById })
    }, [userById, loadingUserById])

    React.useEffect(() => {
        if (isUpdating && !loadingUserById) navigate("/staff")
    }, [loadingUserById])

    const sendForm = () => {
        setIsUpdating(true)
        const newInfoUser = {...infoUser}
        delete newInfoUser.created_at;
        
        const userType = userTypes.find(u => u.id == newInfoUser.user_type_id)
        // newInfoUser.user_type = userType.name
        // delete newInfoUser.user_type_id

        if (infoUser.id) updateUserByIDAction(newInfoUser)
        else createUserAction(newInfoUser)
    }
    const checkIfDisabled = () => {
        let disabled = true;
        if(infoUser.name && infoUser.surname && infoUser.username && infoUser.user_type_id && infoUser.email && (!isNew || infoUser.password)) disabled = false;
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
                                        {(loadingUserById) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className='imageContainer withLetters' style={{ backgroundColor: `${generateColorFromName(infoUser.name)}` }}>
                                                                <div className='image'>
                                                                    <p>{generateLetterByName(infoUser.name)}{generateLetterByName(infoUser.surname)}</p>
                                                                </div>
                                                            </div>
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoUser.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Suername</p>
                                                                        <input value={infoUser.surname} onChange={(e) => changeFormProp("surname", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Username</p>
                                                                        <input value={infoUser.username} onChange={(e) => changeFormProp("username", e.target.value)} />
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Role</p>
                                                                        <select
                                                                            value={infoUser.user_type_id}
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
                                                                        <input disabled={true} value={infoUser.surname} />
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
                                                                        <input value={new Date(infoUser.created_at).toLocaleDateString()} disabled="true" />
                                                                    </div>
                                                                    <div>
                                                                        <p>Email</p>
                                                                        <input value={infoUser.email} onChange={(e) => changeFormProp("email", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Password</p>
                                                                        <input type='password' disabled={!isNew} value={!isNew ? "******" : infoUser.password} onChange={(e) => changeFormProp("password", e.target.value)} />
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
        loadingUserById: state.authData.loadingUserById,
        loadingUserTypes: state.authData.loadingUserTypes,
        userById: state.authData.userByID,
        userTypes: state.authData.userTypes
    };
};

const mapDispatchToProps = {
    getUserByIDAction,
    getUserTypesAction,
    updateUserByIDAction,
    createUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffById);
