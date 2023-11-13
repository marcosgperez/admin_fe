import React from "react";
import { Nav } from 'react-bootstrap';
import { connect } from "react-redux";
import { useState } from "react";

const TasksListFilter = ({ handleClick, taskTypes,isAdmin ,user }) => {

    const [tabs, setTabs] = useState([
        { id: "All", name: "All" },
    ])

    React.useEffect(() => {
        if(taskTypes && taskTypes.length && tabs.length === 1){
            if(isAdmin){
                const newTabs = [...taskTypes].map(t => ({ id: t.id, name: t.name }))
                setTabs([...tabs, ...newTabs])
            } else {
                const newTabs = [...taskTypes].filter(t => t.id === user.user_type_id).map(t => ({ id: t.id, name: t.name }))
                handleClick(newTabs[0].id)
                setTabs([...newTabs])
            }
        }
    },[taskTypes])


    return (

        <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap">
            <div className="card-action coin-tabs mb-2">
                <Nav as="ul" className="nav nav-tabs d-none d-md-flex" role="tablist">
                    {tabs.map(t => (
                        <Nav.Item key={t.id} as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey={t.id} onClick={() => handleClick(t.id)} >See {t.name}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
                <div className="d-flex d-md-none">
                    <select className="form-control form-control-lg" onChange={(e) => handleClick(e.target.value)}>
                        {tabs.map(t => (
                            <option key={t.id} value={t.id} >See {t.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        taskTypes: state.authData.userTypes,
        isAdmin: state.authData.user && state.authData.user.user_type_id == 1,
        user: state.authData.user
        
    };
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListFilter);
