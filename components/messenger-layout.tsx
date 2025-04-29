"use client"

import { useState } from "react"
import { Messenger } from "@/components/messenger"
import { Sidebar } from "@/components/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Chat = {
  id: number
  name: string
  lastMessage: string
  unread: number
  avatar: string
}

export function MessengerLayout() {
  const [selectedChat, setSelectedChat] = useState<number>(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Always show sidebar on desktop
  const showSidebar = isDesktop ? true : sidebarOpen

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Mobile sidebar toggle */}
      {!isDesktop && (
        <Button variant="ghost" size="icon" className="absolute top-3 left-3 z-50 md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className={`${isDesktop ? "w-80" : "w-full md:w-80"} border-r bg-white`}>
          <Sidebar
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={(id) => {
              setSelectedChat(id)
              if (!isDesktop) {
                setSidebarOpen(false)
              }
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 ${!isDesktop && sidebarOpen ? "hidden" : "block"}`}>
        <Messenger selectedChatId={selectedChat} chats={chats} />
      </div>
    </div>
  )
}
