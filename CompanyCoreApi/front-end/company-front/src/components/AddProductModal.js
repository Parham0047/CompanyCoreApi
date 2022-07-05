import React,{Component,useState, useEffect} from 'react';
import { TextField, Grid, withStyles, Button } from "@material-ui/core"
import {Modal, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from "../actions/product";
import { useToasts } from "react-toast-notifications"

const styles = theme =>({
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    productName:"",
    productCode:""
}

const AddProductModal = ({
    show,
    classes,
    ...props
}) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    //toast msg
    const { addToast } = useToasts()

    const handleInputChange = e => {
        const {name,value} = e.target
        const fieldValues = {[name]: value}
        setValues({
            ...values,
            ...fieldValues
        })
        validate(fieldValues)
    }

    const [showModal1, setShowModal1] = useState(true);
    const trriger = () => {
        setShowModal1(false)
    }
    function refreshPage() {
        window.location.reload(false);
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('productName' in fieldValues) {
            temp.productName = fieldValues.productName ? "" : "This field is required"
        }
        if('productCode' in fieldValues) {
            temp.productCode = fieldValues.productCode ? "" : "This field is required"   
        }
        
        setErrors({
            ...temp
        })

        if(fieldValues === values)
            return Object.values(temp).every(x=> x === "")
    }

    const resetForm = () =>{
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        props.setCurrentId(0)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const onSuccess = () =>{ addToast("Submitted Successfully",{appearance:'success'}) } 
            if(props.currentId === 0){
                props.createProduct(values, onSuccess)
            }else{
                props.updateProduct(props.currentId, values, onSuccess)
            }
        }
        resetForm()
    }

    useEffect(()=>{
        if(props.currentId !== 0){
            setValues({
                ...props.productList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    },[props.currentId])

    return (
        <>
        {
            show ? 
            (
                <div className="container">
                    <Modal size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModal1}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form autoComplete="off" className={classes.root} noValidate onSubmit={handleSubmit}>
                                <Grid container>
                                    <Grid item lg={6} xs={12}>
                                        <TextField name="productCode" variant="outlined"
                                        label="Product Code" value={values.productCode}
                                        onChange={handleInputChange} 
                                        {...(errors.productCode && {error:true, helperText:errors.productCode})}/>

                                        <TextField name="productName" variant="outlined"
                                        label="Product Name" value={values.productName}
                                        onChange={handleInputChange} 
                                        {...(errors.productName && {error:true, helperText:errors.productName})}/>
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <Button className="btn btn-block" variant="contained" color="primary" type="submit" > 
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-block" variant="contained" color="secondary" onClick={()=> { trriger(); refreshPage(); }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) 
            : null
        }
        </> 
    )

}

const mapStateToProps = state =>({
    productList: state.product.list
})

const mapActionToProps = {
    createProduct: actions.create,
    //updateProduct: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddProductModal));