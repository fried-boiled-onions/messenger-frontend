"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

type Message = {
  id: number
  text: string
  sender: "user" | "other"
  timestamp: Date
}

export function Messenger() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Как дела?",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      text: "Привет! Всё хорошо, спасибо. Что нового?",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: 3,
      text: "Ничего особенного. Просто работаю над новым проектом.",
      sender: "other",
      timestamp: new Date(Date.now() - 3400000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: "Понятно! Давай обсудим это позже.",
        sender: "other",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <Card className="border shadow-lg">
      <CardContent className="p-0">
        <div className="border-b p-3 bg-white">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
              <AvatarFallback>АБ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Анна Белова</p>
              <p className="text-xs text-muted-foreground">В сети</p>
            </div>
          </div>
        </div>
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "other" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>АБ</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>ВЫ</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите сообщение..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Отправить</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
