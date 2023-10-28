import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from "react-bootstrap";
import { connect } from 'react-redux';
import { getFacilitieByID, updateFacilitieByID, createFacilitie, getFacilitieTypes } from '../../../store/actions/FacilitiesActions';
import { generateColorFromName, generateLetterByName } from '../../../helpers';
import { Loader } from '../Loader';

const StaffById = ({ getFacilitieByID, userTypes, updateFacilitieByID, userById, loadingFacilitieById, createFacilitie, getFacilitieTypes }) => {
    const location = useLocation();
    let navigate = useNavigate();

    const [infoFacilitie, setInfoFacilitie] = React.useState({
        name: "",
        surname: "",
        user_type_id: 1,
        created_at: new Date().toLocaleDateString()
    })
    const [id, setId] = React.useState()
    const [isNew, setIsNew] = React.useState(true)

    const [isUpdating, setIsUpdating] = React.useState(false)

    const changeFormProp = (prop, value) => {
        setInfoFacilitie({ ...infoFacilitie, [prop]: value })
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
        if (id) getFacilitieByID(id)
    }, [id])

    useEffect(() => {
        getFacilitieTypes()
    }, [])

    // Active pagginarion

    React.useEffect(() => {
        if (userById && !loadingFacilitieById && !isNew) setInfoFacilitie({ ...userById })
    }, [userById, loadingFacilitieById])

    React.useEffect(() => {
        if (isUpdating && !loadingFacilitieById) navigate("/staff")
    }, [loadingFacilitieById])

    const sendForm = () => {
        setIsUpdating(true)
        const newInfoFacilitie = {...infoFacilitie}
        delete newInfoFacilitie.created_at;
        
        const userType = userTypes.find(u => u.id == newInfoFacilitie.user_type_id)
        newInfoFacilitie.user_type = userType.name
        delete newInfoFacilitie.user_type_id

        if (infoFacilitie.id) updateFacilitieByID(newInfoFacilitie)
        else createFacilitie(newInfoFacilitie)
    }
    const checkIfDisabled = () => {
        let disabled = true;
        if(infoFacilitie.name && infoFacilitie.surname && infoFacilitie.username && infoFacilitie.user_type_id && infoFacilitie.email && (!isNew || infoFacilitie.password)) disabled = false;
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
                                        {(loadingFacilitieById) ? (<Loader />) : (
                                            <div className={"tableContainer"} style={{ width: "100%", alignItems: "center" }} >
                                                <div className="basic-form">
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className='row formRow' >
                                                            <div className='imageContainer withLetters' style={{ backgroundColor: `${generateColorFromName(infoFacilitie.name)}` }}>
                                                                <div className='image'>
                                                                    <p>{generateLetterByName(infoFacilitie.name)}{generateLetterByName(infoFacilitie.surname)}</p>
                                                                </div>
                                                            </div>
                                                            <div className=' inputs'>
                                                                <div className='right'>
                                                                    <div>
                                                                        <p>Name</p>
                                                                        <input value={infoFacilitie.name} onChange={(e) => changeFormProp("name", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Suername</p>
                                                                        <input value={infoFacilitie.surname} onChange={(e) => changeFormProp("surname", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Facilitiename</p>
                                                                        <input value={infoFacilitie.username} onChange={(e) => changeFormProp("username", e.target.value)} />
                                                                    </div>
                                                                    <div className=''>
                                                                        <p>Role</p>
                                                                        <select
                                                                            value={infoFacilitie.user_type_id}
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
                                                                        <input disabled={true} value={infoFacilitie.surname} />
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
                                                                        <input value={new Date(infoFacilitie.created_at).toLocaleDateString()} disabled="true" />
                                                                    </div>
                                                                    <div>
                                                                        <p>Email</p>
                                                                        <input value={infoFacilitie.email} onChange={(e) => changeFormProp("email", e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <p>Password</p>
                                                                        <input type='password' disabled={!isNew} value={!isNew ? "******" : infoFacilitie.password} onChange={(e) => changeFormProp("password", e.target.value)} />
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
        loadingFacilitieById: state.authData.loadingFacilitieById,
        loadingFacilitieTypes: state.authData.loadingFacilitieTypes,
        userById: state.authData.userByID,
        userTypes: state.authData.userTypes
    };
};

const mapDispatchToProps = {
    getFacilitieByID,
    getFacilitieTypes,
    updateFacilitieByID,
    createFacilitie
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffById);
