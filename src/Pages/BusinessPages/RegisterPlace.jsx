import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";
const navigate = useNavigate()

function RegisterPlace() {

    const [logo, setLogo] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [address, setAddress] = useState ("")
    const [rating, setRating] = useState ("")
    const [priceLevel, setPriceLevel] = useState("")
    const [phone, setPhone] = useState ("")
    const [email, setEmail] = useState("")
    const [comments, setComments] = useState ("")
    const [error, setError] = useState(null)

    const { user , isLoggedIn } = useContext(AuthContext)
    const { busUser , setBusUser} = useState({})

    const handlePlaceCreate = (e) => {
      e.preventDefault();

      const reqBody = {
        logo,
        name,
        type,
        address,
        rating,
        priceLevel,
        phone,
        email,
        comments,
        createdBy: busUser._id,
      }

      axios.post(`${API_URL}/api/places`, reqBody)
      .then(()=>{
        navigate("/dashboard") // TEMOS QUE VER PARA ONDE DAMOS O REDIRECT
      })
      .catch((error)=>{
        SpeechSynthesisErrorEvent("Failed creating the place")
        console.log(error)

      })
    }
  return (
    <section>
      <div>
          {isLoggedIn ? (
            <div>
              <h3>Register Your Place</h3>
              <form onSubmit={handlePlaceCreate}>
                <div>
                  <label>Name your Place:</label><input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                  </div>
                <div>
                  <label>Your type:</label><input type="text" name="type" value={type} onChange={(e)=> setType(e.target.value)}/>
                  </div>
                <div>
                  <label>Your location:</label><input type="text" name="location" value={address} onChange={(e)=> setAddress(e.target.value)}/>
                  </div>
                <div>
                  <label>Rating:</label><input type="text" name="rating" value={rating} onChange={(e)=> setRating(e.target.value)}/>
                  </div>
                <div>
                  <label>Price Level:</label><input type="text" name="priceLevel" value={priceLevel} onChange={(e)=> setPriceLevel(e.target.value)}/>
                  </div>
                <div>
                  <label>Your Phone:</label><input type="text" name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                  </div>
                <div>
                  <label>Your email:</label><input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  </div>
                <div>
                  <label>Comments:</label><input type="text" name="comments" value={comments} onChange={(e)=> setComments(e.target.value)}/>
                  </div>
                  <button type="submit">Register Place</button>
            </form>
            {error && <p>{error}</p>} {/* Display error message if there's an error */}
          </div>
        ) : (
          <h3>Please Login to register your place</h3>
        )}
      </div>
    </section>
  );
}

export default RegisterPlace;