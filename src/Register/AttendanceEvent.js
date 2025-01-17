import React, { useState , useRef, useEffect } from 'react'
import { baseURL } from '../constant/url';
import toast from 'react-hot-toast';

import {BiQrScan} from 'react-icons/bi'
import { scanner } from '../util/Functionalities'



const AttendanceEvent = () => {
   
    const [id,setId] = useState('');
    const [event,setEvent] = useState('');
    const inputRef = useRef();
    const eventRef = useRef();
    const scannerRef = useRef('null')
    const qrCodeRegionId = "qr-reader";
    
    const outNotify = (status) => {
        if(status.kit){
           toast('its '+status.kit+'\'s kit')
           return
        }
        if(status.food){
           toast('its '+status.food+'\'s food')
           return
        }
        if(status.msg){
           toast(status.msg)
           return
        }
        toast.success('registered : '+status.added)
        
    }

    const handleAdd = async() => {
        
        if(!event ){
            toast.error("select event");
            eventRef.current.focus();
            return;
        }
        if(!id ){
            toast.error("enter ID");
            inputRef.current.focus();
            return;
        }
        try {
           
            const res = await fetch(`${baseURL}/api/event/${event}/${id}`,{
            method : 'POST',
            credentials : 'include',
            headers : {
                "Content-Type" : "application/json"
            },
            
        })
        const status = await res.json();
        if(!res.ok){
            throw new Error(status.error || 'participant not found')
           
        }
        
        outNotify(status)
        

        } catch (err) {
           toast.error(err.message)
        } finally {
            inputRef.current.focus();
        }
    }
    
    
    const handleScan = ()=> {  
            scanner(scannerRef,qrCodeRegionId , setId);
        
        
    };
    useEffect(() => {
        if(event)
        toast('set to '+event)
    },[event])
    
  return (
    <div className="relative flex flex-col w-screen h-screen bg-red-600 justify-center items-center">

    <div  className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto w-auto aspect-square ">
        <div className="mb-4">
            
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{event}</h1>
        </div>

        <div className="space-y-4">
            <div className="flex flex-col">
            <label htmlFor="id" className="text-sm font-medium text-gray-600">Scan ID:</label>
            <div className='flex flex-row justify-evenly gap-2'>            
                <input 
                    type="text" 
                    onChange={(e) => setId(e.target.value)} 
                    value={id} 
                    ref={inputRef} 
                    // required 
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 flex-1"
                    />
                <button className="mt-1 flex justify-center items-center border rounded-lg focus:outline-none focus:ring-2 h-auto w-10 text-center" onClick={handleScan}>
                <BiQrScan/>
                </button>
            </div>
            </div>

            <div className="flex flex-col">
            <label htmlFor="event" className="text-sm font-medium text-gray-600">Select Event:</label>
            <select 
                name="event" 
                id="event" 
                ref={eventRef}
                onChange={(e) => setEvent(e.target.value)} 
                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
            >
                <optgroup label="Events">
                <option value="">--SELECT EVENT--</option>
                <option value="EV1">e1</option>
                <option value="EV2">e2</option>
                <option value="EV3">e3</option>
                <option value="EV4">e4</option>
                </optgroup>

                <optgroup label="Others">
                <option value="food">food</option>
                <option value="kit">kit</option>
                
                </optgroup>
            </select>

            </div>
        </div>
        <div className="mt-6">
            <button 
            onClick={handleAdd} 
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
            ADD
            </button>
        </div>
    </div>
    {/* scan area */}
    <div ref={scannerRef} id={qrCodeRegionId} 
      className=' w-auto h-48  aspect-square    ' />
    </div>

  )
}

export default AttendanceEvent