/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC } from "react";
import { Skeleton } from "~/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";

type Props = {
  tableHeader?: React.ReactNode;
  columnCount?: number;
};
export const SkeletonTable: FC<Props> = ({
  tableHeader,
  columnCount,
}: Props) => {
  return (
    <Table className="my-4 table-auto">
      {tableHeader ? (
        tableHeader
      ) : (
        <TableHeader>
          <TableRow>
            {[...Array(columnCount)].map((_, i) => (
              <TableHead
                key={`skeleton-table-head-${i}`}
                className="text-center"
              >
                <Skeleton className="h-6 w-full md:h-8" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={`parlor-${i}`}>
            {[...Array(columnCount)].map((_, i) => (
              <TableCell
                key={`skeleton-table-cell-${i}`}
                className="text-center"
              >
                <Skeleton className="h-6 w-full md:h-8" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
