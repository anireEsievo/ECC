export const ValidateAuth = (data, type) => {
    let errors = {}

    if(type === "registration"){
        const {username, password, confirmPassword} = data
        if(fieldIsEmpty(username)){
            errors.username = "Field cannot be empty."
        }
        if(fieldIsEmpty(password)){
            errors.password = "Field cannot be empty."
        }
        if(fieldIsEmpty(confirmPassword)){
            errors.confirmPassword = "Field cannot be empty."
        }
        if(password !== confirmPassword){
            errors.password = "Passwords don't match."
            errors.confirmPassword = "Passwords don't match."
        }
        
        if(Object.values(data).every(field => !fieldIsEmpty(field)) && password === confirmPassword){
            errors.none = true
        }
    }
    else{
        const {username, password} = data
        if(fieldIsEmpty(username)){
            errors.username = "Field cannot be empty."
        }
        if(fieldIsEmpty(password)){
            errors.password = "Field cannot be empty."
        }
        
        if(Object.values(data).every(field => !fieldIsEmpty(field))){
            errors.none = true
        }
    }

    return errors;
}

export  const fieldIsEmpty = (string) => {
    return string  === ''
}