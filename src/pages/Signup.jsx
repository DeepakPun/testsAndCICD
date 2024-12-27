import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/users'

export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to signup'),
  })

  const handleSubmit = e => {
    e.preventDefault()
    signupMutation.mutate()
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
            value={signupMutation.isPending ? 'Signing Up ...' : 'Sign Up'}
            disabled={!username || !password || signupMutation.isPending}
          />
        </div>
      </form>
    </div>
  )
}
