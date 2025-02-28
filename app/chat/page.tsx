'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'


export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  // WebSocket connection function
  const connectWebSocket = () => {
    const ws = new WebSocket('wss://websockets-chat-backend.gmparstone99.workers.dev/ws')

    ws.onopen = () => {
      console.log('WebSocket Connected')
      setIsConnected(true)
    }

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    ws.onclose = () => {
      console.log('WebSocket Disconnected, attempting to reconnect...')
      setIsConnected(false)
      setTimeout(connectWebSocket, 5000) // Reconnect after 5 seconds
    }

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    wsRef.current = ws
  }

  // Initialize WebSocket on mount
  useEffect(() => {
    connectWebSocket()

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // Send message handler
  const handleSendMessage = () => {
    if (wsRef.current && newMessage.trim() && isConnected) {
      wsRef.current.send(newMessage)
      setNewMessage('') // Clear input after sending
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-lg">
      {/* Chat Header */}
      <div className="p-4 text-lg font-semibold bg-gray-100 border-b flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          WebSocket Chat
        </div>
        <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
          {isConnected ? '✅ Connected' : '❌ Disconnected'}
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet. Start chatting!</p>
        ) : (
          messages.map((msg, index) => (
            <Card key={index} className="p-2 bg-gray-100 rounded-md mb-2">
              {msg}
            </Card>
          ))
        )}
      </div>

      {/* Input Field and Send Button */}
      <div className="flex p-4 bg-gray-100 border-t">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter
          className="flex-1 mr-2"
          disabled={!isConnected} // Disable input when disconnected
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white"
          disabled={!isConnected} // Disable button when disconnected
        >
          Send
        </Button>
      </div>
    </div>
  )
}