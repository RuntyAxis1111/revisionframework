"use client"

import type React from "react"

import { useState } from "react"

interface PasswordOverlayProps {
  onSuccess: () => void
}

export function PasswordOverlay({ onSuccess }: PasswordOverlayProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const correctPassword = "1999"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === correctPassword) {
      onSuccess()
    } else {
      setError("Incorrect password")
      setPassword("")
      setTimeout(() => {
        window.location.href = "https://www.google.com"
      }, 1000)
    }
  }

  return (
    <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-black rounded-lg p-10 text-center animate-pulse">
        <h2 className="text-black text-2xl font-bold mb-5">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-48 p-3 mb-3 bg-white border border-black text-black rounded text-center"
            autoFocus
          />
          <br />
          <button
            type="submit"
            className="bg-black text-white px-5 py-3 rounded font-bold hover:shadow-lg transition-all"
          >
            Enter
          </button>
        </form>
        {error && <p className="text-black mt-3 text-sm min-h-5">{error}</p>}
      </div>
    </div>
  )
}
