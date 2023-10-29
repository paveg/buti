import { Button } from "~/ui/button";
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { type ColumnDef } from "@tanstack/react-table";
import { type ParlorWithGames } from "~/types/parlor";

export const columns: ColumnDef<ParlorWithGames>[] = [
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          名前
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'name'
  },
  {
    header: '対局数',
    cell: ({ row }) => {
      const gameCount = row.original.sessions.reduce((acc, cur) => acc + cur.games.length, 0)
      return <div>{gameCount}</div>
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          作成日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const createdDate = format(new Date(row.getValue("createdAt")), 'yyyy/MM/dd')

      return <div>{createdDate}</div>
    }
  },
]
