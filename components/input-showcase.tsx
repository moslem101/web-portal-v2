'use client'

import { SearchIcon } from '@/components/icons/search'
import { UserIcon } from '@/components/icons/user'
import { Input } from '@/components/ui/input'
import { AlertCircle, Info, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'

export default function InputDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  // Form validation example
  const [formSubmitted, setFormSubmitted] = useState(false)
  const emailError = formSubmitted && !email ? 'Email is required' : ''
  const passwordError =
    formSubmitted && password.length < 8
      ? 'Password must be at least 8 characters'
      : ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (email && password.length >= 8) {
      alert('Form submitted successfully!')
      // Reset form
      setEmail('')
      setPassword('')
      setFormSubmitted(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-8 p-8">
      <h1 className="heading-2-semibold">Input Examples</h1>

      <div className="space-y-6">
        <h2 className="heading-3-medium">Basic Inputs</h2>

        <Input placeholder="Default input" />

        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          startIcon={<Mail className="h-5 w-5" />}
          helperText="We'll never share your email with anyone else."
          error={emailError}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startIcon={<Lock className="h-5 w-5" />}
          helperText="Password must be at least 8 characters"
          error={passwordError}
        />
      </div>

      <div className="space-y-6">
        <h2 className="heading-3-medium">Input States</h2>

        <Input placeholder="Disabled input" disabled />

        <Input
          placeholder="With helper text"
          helperText="This is some helpful information."
          startIcon={<Info className="h-5 w-5" />}
        />

        <Input
          placeholder="With error state"
          error="This field has an error"
          startIcon={<AlertCircle className="h-5 w-5" />}
        />
      </div>

      <div className="space-y-6">
        <h2 className="heading-3-medium">Use Cases</h2>

        <Input
          placeholder="Search..."
          endIcon={<SearchIcon className="text-primary-900" />}
        />

        <Input
          label="Username"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          endIcon={<UserIcon className="text-primary-900" />}
          helperText={username ? `Your profile: mysite.com/${username}` : ''}
          model="expended"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border-t border-neutral-200 pt-4"
      >
        <h2 className="heading-3-medium">Form Example</h2>

        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          startIcon={<Mail className="h-5 w-5" />}
          error={emailError}
          required
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startIcon={<Lock className="h-5 w-5" />}
          error={passwordError}
          required
        />

        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 rounded-full px-6 py-3 font-medium text-neutral-900 transition-colors"
        >
          Submit Form
        </button>
      </form>
    </div>
  )
}
