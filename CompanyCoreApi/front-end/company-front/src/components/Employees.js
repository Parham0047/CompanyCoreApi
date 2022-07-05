import React,{Component, useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/employee";
import { useToasts } from "react-toast-notifications";
import { Table, TableHead , TableContainer, TableRow, TableCell, TableBody, } from "@material-ui/core"
import {Container ,Row, Col, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import { Prev } from 'react-bootstrap/esm/PageItem';

const Employees = ({classes,...props}) => {

    const [currentId, setCurrentId] = useState(0);
    const [ModalShow, setModalShow] = useState(false);
    const [EditShow, setEditShow] = useState(false);
    
    const onClicks = () => {setModalShow(!ModalShow)};
    const onEdit = () => {setEditShow(!EditShow)};

    useEffect(() =>{
        props.fecthAllEmployees();
    },[])

    //toast msg
    const { addToast } = useToasts()

    const onDelete = id =>{
        if(window.confirm("Are you sure you want to delete ?")){
            props.deleteEmployee(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
        }
    }

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Full Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Blood Group
                                </TableCell>
                                <TableCell>
                                    Mobile
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    props.employeeList.map((record, index)=>{
                                        const changeId = ()=>{setCurrentId(record.id)}
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>
                                                    {record.fullName}
                                                </TableCell>
                                                <TableCell>
                                                    {record.email}
                                                </TableCell>
                                                <TableCell>
                                                    {record.bloodGroup}
                                                </TableCell>
                                                <TableCell>
                                                    {record.mobile}
                                                </TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button className="mr-2" variant="primary">
                                                            <Icon.PencilSquare variant="primary" onClick={() =>{changeId(); onEdit();}}/>
                                                        </Button>
                                                        <Button variant="danger">
                                                            <Icon.Trash variant="danger" onClick={()=> onDelete(record.id)}/>
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ButtonToolbar>
                        <Button variant="primary" className="btn btn-block" style={{ padding:'6px 35px', marginTop:'10px' }}
                        onClick={() => onClicks()} >
                            <Icon.PlusCircle  />
                        </Button>         
                    </ButtonToolbar>
                <AddEmployeeModal show={ModalShow} {...({ currentId, setCurrentId })} />
                <EditEmployeeModal show={EditShow} {...({ currentId, setCurrentId })} />
                </Col>
            </Row>
        </Container>
    )

}

const mapStateToProps = state =>({
    employeeList: state.employee.list
})

const mapActionToProps = {
    fecthAllEmployees: actions.fetchAll,
    deleteEmployee: actions.Delete,
}

export default connect(mapStateToProps, mapActionToProps)((Employees));