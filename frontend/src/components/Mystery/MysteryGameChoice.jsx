
const Choice = async () => {
    const response = ""
    const responseOne = async () => {
        response = "(Response one chosen.)"
    }
    const responseTwo = async () => {
        response = "(Response two chosen.)"
    }
    const responseThree = async () => {
        response = "(Response three chosen.)"
    }
    
    return(
        <div>
            <button onClick={responseOne}> Go through the Red Door</button>
    
            <button onClick={responseTwo}> Go through the Green Door</button>

            <button onClick={responseThree}> Go through the Blue Door</button>

            <response/>
        </div>
    )

}

export default Choice