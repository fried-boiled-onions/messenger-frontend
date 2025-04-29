"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, User } from "lucide-react"
import Link from "next/link"

type Chat = {
  id: number
  name: string
  lastMessage: string
  unread: number
  avatar: string
}

interface SidebarProps {
  chats: Chat[]
  selectedChat: number
  onSelectChat: (id: number) => void
}

export function Sidebar({ chats, selectedChat, onSelectChat }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter chats based on search query
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">Чаты</h1>
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Профиль</span>
          </Button>
        </Link>
      </div>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск чатов..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                className={`w-full text-left mb-1 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                  selectedChat === chat.id ? "bg-gray-100" : ""
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <Avatar>
                  <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                  <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{chat.name}</p>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center p-4 text-muted-foreground">Чаты не найдены</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
