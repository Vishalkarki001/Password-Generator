import { useState ,useCallback,useEffect,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faEyeSlash } from '@fortawesome/free-solid-svg-icons'




function App() {
  const [length, setLength] = useState(6)
  const [numberallowed,setNumberallowed]=useState(false);
  const [characterallowed,setCharacterallowed]=useState(false);
  const [password,setPassword]=useState("")
  const [show,setShow]=useState(false);

  //useref
  const passwordRef=useRef(null)
   const passwordGenrator=useCallback(()=>{
   let pass=""
   let str="ABCDEFGHIJKLMNOPQRTUVWXYZabcdefghijklmnpqrstuvwxyz"
   if(numberallowed) str+="012345689"
   if(characterallowed) str+="@!#$&*^_~"

   for(let i=1; i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
   }
   setPassword(pass)

   },[length,numberallowed,characterallowed,setPassword])
   const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
   },[password])
 
   useEffect(()=>{passwordGenrator()},[length,numberallowed,characterallowed,passwordGenrator])
   const mode= ()=>{
    setShow(!show);
   }

  return (
    <>
   
    <div className='w-full max-w-xl mx-auto shadow-lg rounded-xl  p-7 px-4 my-15 h-60
        text-white bg-blue-400 justify-center mt-40 '>
          <h1 className='text-black text-2xl  text-center cursor-pointer my-3 hover:text-white duration-2s'>Password Genrator</h1>

          <div className='flex shadow rounded-md overflow-hidden mb-6 text-black font-2xl '>
            <input
            type={show ? 'text' :'password'}
            value={password}
            className='outline-none w-full py-3 px-9'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          

            ></input>
            <button onClick={mode}
            className='bg-white hover:bg-gray-300'
        
           > 
            <FontAwesomeIcon icon={faEyeSlash } 
            className=' py-2  px-3 hover: cursor-pointer' />  </button>      


            <button
            onClick={copyPasswordToClipboard} 
            className='outline-none bg-blue-700 px-3 text-center text-lg font-lg py-0.5 shrink-0 hover:bg-gray-300'>Copy</button>
            
          

          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range" 
               min={6}
               max={100}
               value={length}
               className='cursor-pointer'
               onChange={(e)=>{setLength(e.target.value)}}
               />
               <label>Length:{length}</label>
              </div> 
              <div className='flex items-center gap-x-1'>
                <input
                type="checkbox"
                defaultChecked={numberallowed}
                id="numberInput"
                onChange={()=>{
                  setNumberallowed((prev) => !prev);
                 }}
                 />
                 <label htmlfor="numberInput">Numbers</label>
                
                
              </div>
              <div className='flex items-center gap-x-1'>
                <input
                type="checkbox"
                defaultChecked={characterallowed}
                id="characterInput"
                onChange={()=>{
                  setCharacterallowed((prev) => !prev);
                 }}
                 />
                 <label htmlfor="characterInput">Characters</label>
                 </div>

          </div>
      </div>  
    </>
  )
}

export default App
