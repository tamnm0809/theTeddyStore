import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const Describe_pro = (props) => {
    const [rateDetails, setRateDetails] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách chi tiết đánh giá

  const fetchRateDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:7070/teddy-store/getAllRateDatil/${props.id}`);
      setRateDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch rate details:', error);
    }
  };fetchRateDetails();

}, [props.id]);
    return (
        <>
            <div className='Accrate'>
            {rateDetails.map((rateDetail, index) => (
                
          <li key={index}>
                <div   className="lable">
                <img src={rateDetail.avt} alt="Avatar" />
                </div>
                <div>
                    <h5>{rateDetail.name}</h5>
                    <div>
                        <i className="bi bi-star"/> 
                    </div> 
                    <div>
                        <p>{rateDetail.comment}</p>
                    </div>
                </div> 
          </li>
          
        ))}
                
            </div>
        </>
    );
};

export default Describe_pro;