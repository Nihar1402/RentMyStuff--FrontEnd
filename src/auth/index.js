

export const isLoggedIn=()=>{
    let data=localStorage.getItem("data");
    if(data==null){
        return false;
    }
    else{
        return true;
    }
}

export const doLogin=(data)=>{
    localStorage.setItem("data",JSON.stringify(data));
    localStorage.setItem("isLoggedIn",JSON.stringify(true));
    // next()
    // isLoggedIn()
}

export const doLogout=()=>{
    localStorage.removeItem("data");
    // localStorage.removeItem("isLoggedIn");
    localStorage.setItem("isLoggedIn",JSON.stringify('false'));

    //  next()
    // isLoggedIn()
}

export const getCurrentUserDetail=()=>{
    return JSON.parse(localStorage.getItem("data"));
}