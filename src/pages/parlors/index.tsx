import { CreateParlorForm } from "~/components/form/createParlorForm";
import { ParlorTable } from "~/components/table/parlorTable";
import { Layout } from "~/layouts";

export default function ParlorIndex () {
  return (
    <Layout>
      <ParlorTable />
      <CreateParlorForm />
    </Layout>
  );
}
