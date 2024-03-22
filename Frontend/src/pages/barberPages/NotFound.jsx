import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <>
        <h2 style={{color:"red"}}>404! Cette page ne trouve pas.</h2><br />
        <Link to="/">
      <input 
        type="button" 
        style={{
          backgroundColor: "red",
          color: "white",
          borderRadius: "6px",
          fontSize: "16px"
        }} 
        value="Go Back"
      />
    </Link>
        </>
    )
}