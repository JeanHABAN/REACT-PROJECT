import React from 'react'
import './styleFooter.css'
// export default function Footer() {
//   return (
//     <div className='footer'>
//       <p>copyright,@2023 jean miu</p>
//     </div>
//   )
// }


class Footer extends React.Component{
  render(){
    return (
      <div className='footer'>
        <div>copyright,@2023 jean miu</div>
      </div>
    )
  }
}

export default Footer