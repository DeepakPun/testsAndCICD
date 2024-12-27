import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { User } from './User'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)

    return (
      <nav>
        Logged in as <User id={sub} />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
      </nav>
    )
  }

  return (
    <nav>
      <Link to='/login'>Login</Link> | <Link to='/signup'>Sign Up</Link>
    </nav>
  )
}
