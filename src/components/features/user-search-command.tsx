/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { useNavigate } from "react-router-dom"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/customer.types"
import { urls } from "@/routes"

interface UserSearchCommandProps {
  users: User[]
}

export default function UserSearchCommand({ users }: UserSearchCommandProps) {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (userId: string) => {
    setOpen(false)
    navigate(urls.personalInfo.replace(":id", userId))
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} className="ml-auto">
        Search Users (⌘K)
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search by name, username, email, or id..." autoFocus />
        <CommandList>
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup heading="Users">
            {users?.map((u) => (
              <CommandItem
                key={u.id}
                value={`${u.firstName} ${u.lastName} ${u.username} ${u.email} ${u.id}`}
                onSelect={() => handleSelect(u.id)}
              >
                <span className="font-medium">{u.firstName} {u.lastName}</span>
                <span className="text-muted-foreground ml-2">@{u.username}</span>
                <span className="text-muted-foreground ml-2">{u.email}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}

