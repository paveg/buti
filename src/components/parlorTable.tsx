import { type Parlor } from "@prisma/client";

export const ParlorTable = ({ parlors }: { parlors: Parlor[] }) => {
  return (
    <>{JSON.stringify(parlors, null, 2)}</>
  )
}
