import api from "./productApi";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
}

const formateData = data =>({
    ...data,
    productCode:parseInt(data.productCode?data.productCode:0)
})

export const fetchAll = () => dispatch =>{
    api.product().fetchAll()
    .then(
        response => {
            console.log(response);
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        }
    )
    .catch(err => console.log(err))
}

//add
export const create = (data, onSuccess) => dispatch =>{
    data = formateData(data)
    api.product().create(data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}
//update
export const update = (id, data, onSuccess) => dispatch =>{
    data = formateData(data)
    api.product().update(id, data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}
//delete
export const Delete = (id, onSuccess) => dispatch =>{
    api.product().delete(id)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}