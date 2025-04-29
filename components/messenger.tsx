"use client"

import type React from "react"

import { useState } from "react"
import { Send, MoreVertical, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Message = {
  id: number
  text: string
  sender: "user" | "other"
  timestamp: Date
  status?: "sent" | "delivered" | "read"
}

type Chat = {
  id: number
  name: string
  lastMessage: string
  unread: number
  avatar: string
}

interface MessengerProps {
  selectedChatId: number
  chats: Chat[]
}

export function Messenger({ selectedChatId, chats }: MessengerProps) {
  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || chats[0]

  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
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
        status: "read",
      },
      {
        id: 3,
        text: "Ничего особенного. Просто работаю над новым проектом.",
        sender: "other",
        timestamp: new Date(Date.now() - 3400000),
      },
    ],
    2: [
      {
        id: 1,
        text: "Привет! Как насчет встречи завтра?",
        sender: "other",
        timestamp: new Date(Date.now() - 1800000),
      },
    ],
    3: [
      {
        id: 1,
        text: "Отправляю тебе документы, которые ты просил.",
        sender: "other",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: 2,
        text: "Спасибо за информацию!",
        sender: "user",
        timestamp: new Date(Date.now() - 7000000),
        status: "read",
      },
    ],
    4: [
      {
        id: 1,
        text: "Всем привет! Когда у нас следующая встреча?",
        sender: "other",
        timestamp: new Date(Date.now() - 5400000),
      },
      {
        id: 2,
        text: "Завтра в 15:00",
        sender: "user",
        timestamp: new Date(Date.now() - 5300000),
        status: "read",
      },
      {
        id: 3,
        text: "Алексей: Давайте обсудим это на следующей встрече",
        sender: "other",
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
  })

  const [newMessage, setNewMessage] = useState("")

  const currentMessages = messages[selectedChatId] || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const message: Message = {
      id: (currentMessages.length > 0 ? currentMessages[currentMessages.length - 1].id : 0) + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), message],
    }))
    setNewMessage("")

    // Simulate message being delivered
    setTimeout(() => {
      setMessages((prev) => {
        const updatedMessages = [...prev[selectedChatId]]
        const lastMessage = updatedMessages[updatedMessages.length - 1]
        if (lastMessage.sender === "user") {
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            status: "delivered",
          }
        }
        return {
          ...prev,
          [selectedChatId]: updatedMessages,
        }
      })
    }, 500)

    // Simulate response and read receipt after a short delay
    setTimeout(() => {
      // Mark the message as read
      setMessages((prev) => {
        const updatedMessages = [...prev[selectedChatId]]
        const lastMessage = updatedMessages[updatedMessages.length - 1]
        if (lastMessage.sender === "user") {
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            status: "read",
          }
        }

        // Add response message
        const response: Message = {
          id: (updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1].id : 0) + 1,
          text: "Понятно! Давай обсудим это позже.",
          sender: "other",
          timestamp: new Date(),
        }

        return {
          ...prev,
          [selectedChatId]: [...updatedMessages, response],
        }
      })
    }, 2000)
  }

  // Function to render message status
  const renderMessageStatus = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "sent":
        return <Check className="h-3.5 w-3.5 ml-1 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3.5 w-3.5 ml-1 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3.5 w-3.5 ml-1 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-3 bg-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
            <AvatarFallback>{selectedChat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{selectedChat.name}</p>
            <p className="text-xs text-muted-foreground">В сети</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Меню</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Профиль
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Очистить историю</DropdownMenuItem>
            <DropdownMenuItem>Заблокировать</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentMessages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "other" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-end mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {message.sender === "user" && renderMessageStatus(message.status)}
                </div>
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
      <div className="p-3 border-t bg-white">
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
      </div>
    </div>
  )
}
