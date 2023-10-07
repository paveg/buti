import { CreateParlorForm } from "~/components/form/createParlorForm";
import { ParlorTable } from "~/components/table/parlorTable";
import { Layout } from "~/layouts";
import { api } from "~/utils/api";

export default function () {
  return (
    <Layout>
      <ParlorTable />
      <CreateParlorForm />
    </Layout>
  );
}
