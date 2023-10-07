import { FC } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "~/utils/api";

type Props = {
  id: string;
};
export const MemberDetailContainer: FC<Props> = ({ id }: props) => {
  const { data: member, isLoading } = api.member.get.useQuery({ id: id });

  return (
    <>
      {!isLoading && (
        <>
          <h1 className="text-2xl text-center">{member?.name}</h1>
          <LineChart
            className="mx-auto ma-4"
            width={800}
            height={300}
            data={member?.results.map((result) => {
              return {
                name: `${result.game.name}${result.sequence + 1}局`,
                rank: result.rank,
              };
            })}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              type="number"
              allowDecimals={false}
              reversed
              padding={{ top: 5, bottom: 5 }}
              interval={1}
              domain={[1, 4]}
            />
            <Tooltip />
            <Line type="monotone" dataKey="rank" stroke="#8884d8" />
          </LineChart>
        </>
      )}
    </>
  );
};
