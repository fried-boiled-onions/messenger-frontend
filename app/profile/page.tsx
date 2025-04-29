"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ProfilePage() {
  const [nickname, setNickname] = useState("Ваше Имя")
  const [isEditing, setIsEditing] = useState(false)
  const [tempNickname, setTempNickname] = useState(nickname)

  const handleSave = () => {
    setNickname(tempNickname)
    setIsEditing(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center space-x-2 pb-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Назад</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Профиль</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
              <AvatarFallback>{nickname.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            {isEditing ? (
              <div className="space-y-2 w-full">
                <Label htmlFor="nickname">Никнейм</Label>
                <Input
                  id="nickname"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  placeholder="Введите никнейм"
                />
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-medium">{nickname}</h2>
                <p className="text-sm text-muted-foreground">В сети</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 w-full">
          {isEditing ? (
            <div className="flex space-x-2 w-full">
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(false)}>
                Отмена
              </Button>
              <Button className="w-full" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => setIsEditing(true)}>
              Редактировать профиль
            </Button>
          )}
          <Button variant="destructive" className="w-full">
            Выйти из профиля
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
