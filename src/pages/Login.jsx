import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/users'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

export function Login() {
  const [, setToken] = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: data => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('failed to login'),
  })

  const handleSubmit = e => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div style={{ padding: 30 }}>
      <form onSubmit={handleSubmit}>
        <Link to='/'>Back to main page</Link>
        <br />
        <br />
        <br />
        <div>
          <label htmlFor='create-username'>Username: </label>
          <input
            type='text'
            name='create-username'
            id='create-username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor='create-password'>Password: </label>
          <input
            type='password'
            name='create-password'
            id='create-password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type='submit'
            value={loginMutation.isPending ? 'Logging In ...' : 'Log In'}
            disabled={!username || !password || loginMutation.isPending}
          />
        </div>
      </form>
    </div>
  )
}
