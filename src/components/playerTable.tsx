import { type Player } from "@prisma/client"
import { memo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"
import { format } from "date-fns"

type Props = {
  players: Player[] | undefined
}

export const PlayerTable = memo(function playerTableMemo({ players }: Props) {
  return <Table className="my-4 table-auto">
    <TableHeader>
      <TableRow>
        <TableHead className="text-center">名前</TableHead>
        <TableHead className="text-center">作成日</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {players?.map((player) => {
        const createdDate = format(new Date(player.createdAt), 'yyyy/MM/dd')
        return <TableRow key={player.id}>
          <TableCell className="text-center">{player.name}</TableCell>
          <TableCell className="text-center">{createdDate}</TableCell>
        </TableRow>
      })}
    </TableBody>
  </Table>
})