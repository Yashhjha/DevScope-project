import React from 'react'
import { Brain } from 'lucide-react';
import { Sun } from 'lucide-react';


const Navbar = () => {
  return (
    <div>
      <div className="nav text-white flex items-center justify-between   h-[70px] bg-zinc-900" style={{padding:"0px 40px"}}>
        <div className='logo flex items-center gap-[10px] '>
               <Brain className='text-[#9333ea]'/>
             DevScope 
        </div>
        <div className='icons flex items-center gap-[10px]'>
           <i className='cursor-pointer transition-all hover:text-[#9333ea]'><Sun /></i>  
        </div>
       
      </div>
    </div>
  )
}

export default Navbar
