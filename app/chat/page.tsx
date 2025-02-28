'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-lg">
      {/* Chat Header */}
      <div className="p-4 text-lg font-semibold bg-gray-100 border-b flex items-center">
        <MessageSquare className="w-6 h-6 mr-2" />
        WebSocket Chat
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
          className="flex-1 mr-2"
        />
        <Button className="bg-blue-500 text-white">Send</Button>
      </div>
    </div>
  )
}