import { Messenger } from "@/components/messenger"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Messenger</h1>
        <Messenger />
      </div>
    </main>
  )
}
