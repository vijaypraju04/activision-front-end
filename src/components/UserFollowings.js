// import React from 'react'
// import { Link } from 'react-router-dom'
//
// const UserFollowings = (props) => {
//   if (!props.followData){
//     return <div> Loading </div>
//   }
//
//   console.log("FOLLOWINGGGG", props.followData.following.length)
//
//   const followings = props.followData.following.map((following) => {
//       return (
//         <Link to={`/profile/${following.id}`}>
//       {following.username}
//     </Link>
//   )
//   })
//
//   return (
//     <div>
//     <h3> Following Count: {props.followData.following.length} </h3>
//     <h5>{followings}</h5>
//   </div>
//
//   )
// }
//
// export default UserFollowings
