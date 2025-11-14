import { Link } from "react-router"

export const Home = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl">Home</h1>
      <Link className="text-5xl" to="/login">Login</Link>
      <Link className="text-5xl" to="/register">Register</Link>
    </div>
  )
}