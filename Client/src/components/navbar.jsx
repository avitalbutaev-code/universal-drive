// components/Navbar.jsx
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
//       <Link to="/">Home</Link>
//       <Link to="/folder">Folders</Link>
//       <Link to="/bin">Bin</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//     </nav>
//   );
// }

import { Link, useParams } from "react-router-dom";

export default function Navbar() {
  const { user } = useParams(); // get current user from URL

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <Link to={`/${user}/home`}>Home</Link>
      <Link to={`/${user}/home/folder`}>Folders</Link>
      <Link to={`/${user}/home/bin`}>Bin</Link>
      <Link to="/">logout</Link>
    </nav>
  );
}
