import React, { useState, useRef } from 'react';
import { baseURL } from '../constant/url';
import {BiQrScan} from 'react-icons/bi'
import { scanner } from '../util/Functionalities';
import toast from 'react-hot-toast'





const IDprintPage = () => {
    const [id, setId] = useState('');
    const [QRimg,setQRimg] = useState('')
    const [detail,setDetail] = useState({})
    const [isThere,setIsThere] = useState('')
    
    const [dispPage, setDispPage ] =useState(true)
    const inputRef = useRef();

    const scannerRef = useRef('null')
    const qrCodeRegionId = "qr-reader";
    
    
    const handleSearch = async () => {
      if(!id){
        toast.error('no id entered')
        setIsThere('')
        return;
      }
        try {
            // console.log("search click")
            const res = await fetch(`${baseURL}/api/provider/printid/${id}`,{
                method : "GET",
                credentials : 'include',
                headers : {
                    "Content-Type" : "application/json"
                },
            })
            
            const participant = await res.json();
            if(!res.ok){
              throw new Error(participant.error || "data not found")
            }
            setDetail(participant)
            setIsThere(participant.name)
            const img = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`;
            setQRimg(img);
            
            
            // console.log("Search :" , detail);
          } catch (err) {
            toast.error('data not found')
            setIsThere('')
            
        }
        
    };
    
    const handleScan = ()=> {  
      scanner(scannerRef,qrCodeRegionId , setId);
    };

    const handlePrint = async () => {
        // Check if there's nothing to print
        if (isThere === '') {
          toast("Nothing to print");
          return;
        }
      
        try {
          
          
      
          
          // await new Promise((resolve) => setTimeout(resolve, 100));
      
          
          setDispPage(false);
      
          
          await new Promise((resolve) => setTimeout(resolve, 500));
      
          
          window.print();
      
          
          await new Promise((resolve) => setTimeout(resolve, 500)); 
          
          setDispPage(true);
          
          
          toast.success('done ✔')
          setId('');
          setQRimg('');
          setDetail({});
          setIsThere('')
          await new Promise((resolve) => setTimeout(resolve, 500)); 
          inputRef.current.focus();
      
        } catch (err) {
          toast.error(err.message)
        }
      };
      
      
      
    
    if(dispPage){
        return (
            <div className="max-w-md mx-auto  h-screen p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center ">
            <label htmlFor="Printid" className="block text-sm font-medium text-gray-700">
              ID here:
            </label >
            <div className='flex justify-between gap-3'>
            <input
              type="text"
              
              id="Printid"
              value={id}
              onChange={(e) => setId(e.target.value)}
              ref={inputRef}
              className="mt-1 p-1 px-2 block bg-slate-300 w-full border-2 rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            <button className="mt-1 flex justify-center items-center border rounded-lg focus:outline-none focus:ring-2 h-auto w-10 aspect-square text-center" onClick={handleScan}>
                <BiQrScan/>
                </button>
              </div>
          
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSearch}
                className="w-1/2 mr-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Search
              </button>
              <button
                onClick={() => handlePrint()}
                className="w-1/2 ml-2 py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Print
              </button>
            </div>
          
            <p className="text-center text-gray-700 font-medium mt-4">{isThere}</p>
            <div ref={scannerRef} id={qrCodeRegionId}      className=' w-auto h-48  aspect-square    ' />
    
          </div>
          
          
        )}
    else{
        return(
        <div>
            <p>hi you are {id}</p>
            <img src={QRimg} alt={id} />
            <p>{detail.name}</p>
            <p>{detail.phone}</p>
            <p>{detail.college}</p>
            <p>{detail.email}</p>
        </div>
        )
    }
    
};
export default IDprintPage;