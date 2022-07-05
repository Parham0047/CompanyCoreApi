import React,{Component, useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/product";
import { useToasts } from "react-toast-notifications";
import { Table, TableHead , TableContainer, TableRow, TableCell, TableBody, } from "@material-ui/core"
import {Container ,Row, Col, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { Prev } from 'react-bootstrap/esm/PageItem';

const Products = ({classes,...props}) => {
    
    const [currentId, setCurrentId] = useState(0);
    const [ModalShow, setModalShow] = useState(false);
    const [EditShow, setEditShow] = useState(false);
    
    const onClicks = () => {setModalShow(!ModalShow)};
    const onEdit = () => {setEditShow(!EditShow)};

    useEffect(() =>{
        props.fecthAllProducts();
    },[])

    //toast msg
    const { addToast } = useToasts()

    const onDelete = id =>{
        if(window.confirm("Are you sure you want to delete ?")){
            props.deleteProduct(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
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
                                    Product Code
                                </TableCell>
                                <TableCell>
                                    Product Name
                                </TableCell>
                                <TableCell>
                            
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    props.productList.map((record, index)=>{
                                        const changeId = ()=>{setCurrentId(record.id)}
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>
                                                    {record.productCode}
                                                </TableCell>
                                                <TableCell>
                                                    {record.productName}
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
                <AddProductModal show={ModalShow} {...({ currentId, setCurrentId })} />
                <EditProductModal show={EditShow} {...({ currentId, setCurrentId })} />
                </Col>
            </Row>
        </Container>
    )

}

const mapStateToProps = state =>({
    productList: state.product.list
})

const mapActionToProps = {
    fecthAllProducts: actions.fetchAll,
    deleteProduct: actions.Delete,
}

export default connect(mapStateToProps, mapActionToProps)((Products));