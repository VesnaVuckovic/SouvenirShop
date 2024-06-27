export const increase=()=>{
    return {
        type:'increase'
    }
}

export const decrease=()=>{
    return {
        type:'decrease'
    }
}

export const duplicate=()=>{
    return {
        type:'duplicate'
    }
}

export const setFilter = (filterType, filterValue) => ({
    type: 'SET_FILTER',
    payload: { filterType, filterValue }
  });