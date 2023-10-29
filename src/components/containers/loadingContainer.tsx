import { Layout } from "~/layouts"
import { SkeletonTable } from "../skeletonTable"

export const LoadingContainer = ({ table }: { table?: boolean }) => {
  return <Layout>
    {table && <SkeletonTable columnCount={3} />}
  </Layout>
}
