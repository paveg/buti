import { getSortedRowModel, getCoreRowModel, useReactTable, flexRender, type SortingState } from "@tanstack/react-table";
import { EmptyResource } from "~/components/emptyResource";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table";
import { useState } from "react";
import { columns } from "./columns";
import { type ParlorWithGames } from "~/types/parlor";

export const ParlorTable = ({ parlors }: { parlors: ParlorWithGames[] }) => {
  const subject = "雀荘"
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data: parlors,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <>
      {
        // For debugging
        // JSON.stringify(parlors, null, 2)
      }
      {parlors.length === 0 && <EmptyResource subject={subject} />}
      <Table className="my-4 table-auto rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {subject}が存在しません。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
