
const Choice = async () => {
    const response = async (choice) => {
        if(choice === 1){
            <p> Response One Chosen</p>
        }
        else if(choice === 2){
            <p> Response Two Chosen</p>
        }
        else if(choice === 3){
            <p> Response Three Chosen</p>
        }
    }
    
    return(
        <div>
            <button onClick={response(1)}> Go through the Red Door</button>
    
            <button onClick={response(2)}> Go through the Green Door</button>

            <button onClick={response(3)}> Go through the Blue Door</button>

        </div>
    )

}

export default Choice