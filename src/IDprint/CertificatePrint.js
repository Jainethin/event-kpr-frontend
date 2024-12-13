import React ,{useState , useRef} from 'react'
import { baseURL } from '../constant/url';

const CertificatePrint = () => {
    const [id, setId] = useState('');
    
    const [detail,setDetail] = useState([])
    const [isThere,setIsThere] = useState('participant')
    
    const [dispPage, setDispPage ] =useState(true)
    const inputRef = useRef();
    const printRef = useRef();
    
    
    const handleSearch = async () => {
        try {
            console.log("search click")
            const res = await fetch(`${baseURL}/api/provider/printcertificate/${id}`,{
                method : "GET",
                credentials : 'include',
                headers : {
                    "Content-Type" : "application/json"
                },
            })
            
            const participant = await res.json();
            if(!res.ok){
                console.log("data not found")
                throw new Error(participant.error || "data not found")
            }
            if(participant.participated.length >0){
                setDetail(participant.participated)
            }else {setDetail(["no events"])}
            console.log(detail)
            
            setIsThere("Participated in:")
            
            
            
        } catch (err) {
            setIsThere('not found')
            
        }
        
    };
    
    
    
    
    if(dispPage){
        return (
            <div>
            <label htmlFor="Printcertificate">ID here:</label>
            <input 
                type="text" 
                id="Printcertificate" 
                value={id} 
                onChange={(e) => setId(e.target.value)} 
                ref={inputRef}
                
                />

            <button onClick={handleSearch}>Search</button>
            
            <p>{isThere}</p>
            {detail.map((e, index) => (
                <>
                <p key={index} value={e} ref={printRef}>{e}</p>
                <button >PRINT</button>
                </>
            ))}


            
            </div>
        )}
    else{
        return(
        <div>
            <p>hi you are {id}</p>
            
            
        </div>
        )
    }
}

export default CertificatePrint