import React,{Component,useState, useEffect} from 'react';
import { TextField, Grid, withStyles, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core"
import {Modal, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from "../actions/employee";
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    }
})

const initialFieldValues = {
    fullName:"",
    email:"",
    bloodGroup:"",
    mobile:""
    
}

const AddEmployeeModal = ({
    show,
    classes,
    ...props
}) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    /*
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    */

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
        if('fullName' in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This field is required"
        }
        if('email' in fieldValues) {
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not a valid"   
        }
        if('bloodGroup' in fieldValues) {
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required"   
        }
        if('mobile' in fieldValues) {
            temp.mobile = fieldValues.mobile ? "" : "This field is required"   
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
                props.createEmployee(values, onSuccess)
            }else{
                props.updateEmployee(props.currentId, values, onSuccess)
            }
        }
        resetForm()
    }

    useEffect(()=>{
        if(props.currentId !== 0){
            setValues({
                ...props.employeeList.find(x => x.id === props.currentId)
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
                            <Modal.Title>Add Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form autoComplete="off" className={classes.root} noValidate onSubmit={handleSubmit}>
                                <Grid container>
                                    <Grid item lg={6} xs={12}>
                                        <TextField name="fullName" variant="outlined"
                                        label="Full Name" value={values.fullName}
                                        onChange={handleInputChange} 
                                        {...(errors.fullName && {error:true, helperText:errors.fullName})}/>

                                        <TextField name="email" variant="outlined"
                                        label="Email" value={values.email}
                                        onChange={handleInputChange} 
                                        {...(errors.email && {error:true, helperText:errors.email})}/>

                                        <FormControl variant="outlined"
                                        className={classes.formControl}>
                                            <InputLabel >bloodGroup</InputLabel>
                                            <Select
                                            name="bloodGroup"
                                            value={values.bloodGroup}
                                            onChange={handleInputChange}
                                            
                                            >
                                                <MenuItem value="">Select Blood Group</MenuItem>
                                                <MenuItem value="A">A</MenuItem>
                                                <MenuItem value="B">B</MenuItem>
                                                <MenuItem value="AB">AB</MenuItem>
                                                <MenuItem value="O">O</MenuItem>
                                            </Select>
                                            {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                                        </FormControl>

                                        <TextField name="mobile" variant="outlined"
                                        label="Mobile" value={values.Mobile}
                                        onChange={handleInputChange} 
                                        {...(errors.mobile && {error:true, helperText:errors.mobile})}/>
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
    employeeList: state.employee.list
})

const mapActionToProps = {
    createEmployee: actions.create,
    //updateProduct: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddEmployeeModal));