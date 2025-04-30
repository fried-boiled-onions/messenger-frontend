"use client"

import { useState } from "react"
import { Messenger } from "@/components/messenger"
import { Sidebar } from "@/components/sidebar"

type Chat = {
  id: number
  name: string
  lastMessage: string
  unread: number
  avatar: string
}

export function MessengerLayout() {
  const [selectedChat, setSelectedChat] = useState<number>(1)

  const chats: Chat[] = [
    {
      id: 1,
      name: "Анна Белова",
      lastMessage: "Ничего особенного. Просто работаю над новым проектом.",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Иван Петров",
      lastMessage: "Привет! Как насчет встречи завтра?",
      unread: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Мария Сидорова",
      lastMessage: "Спасибо за информацию!",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Группа проекта",
      lastMessage: "Алексей: Давайте обсудим это на следующей встрече",
      unread: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">

      <div className="w-80 border-r bg-white">
        <Sidebar
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={(id) => setSelectedChat(id)}
        />
      </div>

      <div className="flex-1">
        <Messenger selectedChatId={selectedChat} chats={chats} />
      </div>
    </div>
  )
}