import { useState, useEffect } from 'react'
import Card from '../Card'

export default function Gallery({ arrays, refreshQueue, url, updateDetails }) {
 // Keep track of what gallery page the user is viewing
 const [currentPage, setCurrentPage] = useState(1)



 // The default value of gallery content. What we see before the app finsihes querying the API
 let CardContent = <p className='text-white'>Your weather is loading...</p>
 
 return (
     <>
         <div className="flex flex-wrap justify-around p-10">
             {galleryContent}
         </div>

     </>
 )
}