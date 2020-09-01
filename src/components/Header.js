import React from 'react'

const Header = ({getWeatherData}) => {

const handleKeyPress=(e)=>{
    if (e.key === 'Enter') {
        return(
            getWeatherData('','',e.target.value)
        )
    }
    
}

    return (
        <div className="row  d-flex justify-content-between" >
            <div className="col-md-8  mt-5">
                <h1 className="text-white ">Weather App</h1>
            </div>
            <div className="col-md-4 ">
                <input type="text" 
                className="form-control bg-transparent text-white  mt-5 mb-5"
                placeholder="Write a city like (new york)" 
                onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    )
}

export default Header
