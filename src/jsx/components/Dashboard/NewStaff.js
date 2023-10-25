import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";

import { connect } from 'react-redux';
import { getUserByIDAction, updateUserByIDAction } from '../../../store/actions/AuthActions';

const StaffById = ({ getUserByIDAction, updateUserByIDAction, userById, loading }) => {
    const [infoUser, setInfoUser] = React.useState()
    const [isNew, setIsNew] = React.useState(false)
    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        setInfoUser({ ...infoUser, [prop]: value })
    }

    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        const splitedPathname = location.pathname.split("/")
        const id = splitedPathname[splitedPathname.length - 1];
        if (id != "new") getUserByIDAction(id)
        else {
            setInfoUser({})
            setIsNew(isNew)
        }
    }, [location])

    // Active pagginarion

    React.useEffect(() => {
        if (userById && !loading) setInfoUser({ ...userById })
    }, [userById, loading])

    React.useEffect(() => {
        // if (isUpdating && !loading) navigate("/staff")
    }, [loading, isUpdating])

    const sendForm = () => {
        setIsUpdating(true)
        if(infoUser.id) updateUserByIDAction(infoUser)
        else console.log("NEW",infoUser)
    }
    const generateColorFromName = (str) => {

    }

    const generateLetterByName = (str) => {
        str[0].toUpperCase()
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
                                        {(isNew || (loading || !userById || !infoUser)) ? (<div className="loader"></div>) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='formRow' >
                                                            <div className='imageContainer'>
                                                                <div style={{ backgroundColor: `${generateColorFromName(infoUser.name)}` }} className='image'>
                                                                    <p>{generateLetterByName(infoUser.name)}</p>
                                                                </div>
                                                            </div>
                                                            <div className=' inputs'>
                                                                <div className='rigth'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoUser.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Suername</p>
                                                                        <input value={infoUser.surname} onChange={(e) => changeFormProp("surname", e.target.value)} />
                                                                    </div>
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
                                                                <button type="button" onClick={sendForm}>Save</button>
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
        loading: state.authData.loading,
        userById: state.authData.userByID
    };
};

const mapDispatchToProps = {
    getUserByIDAction,
    updateUserByIDAction
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffById);
