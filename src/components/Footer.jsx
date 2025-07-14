import React from 'react'

function Footer() {
  return (
    <div id='footer' className='w-full h-[20vh] flex flex-col items-center justify-center gap-4'>
        <div>
            <p>Subscribe to stay tuned for new products and latest updates.</p>
            <p>Let's do it!</p>
        </div>
        <div>
            <input type="email" placeholder='Enter your email address' className='px-2 outline-none border-[2px] border-general rounded-md w-56 h-8 border-r-0 rounded-r-none'/>
            <button className='w-46 h-8 rounded-md rounded-l-none text-secondary bg-general'>Subscribe</button>
        </div>
        
    </div>
  )
}

export default Footer