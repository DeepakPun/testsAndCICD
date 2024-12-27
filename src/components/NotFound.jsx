import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export function NotFound() {
  return (
    <div style={{ padding: 30 }}>
      <Header />
      <div>
        <div
          style={{
            padding: 30,
            color: 'red',
            fontSize: 'xx-large',
            textAlign: 'center',
            border: '3px solid red',
            borderRadius: '20px',
            marginTop: '10px',
          }}
        >
          Page Not Found
        </div>
        <div>
          <Link to='/'>Home Page</Link>
        </div>
      </div>
    </div>
  )
}
