import { type Rule } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/ui/accordion";
import { Button } from "~/ui/button";
import { Table, TableBody, TableCell, TableRow } from "~/ui/table";

export const RuleTable = ({ rule }: { rule: Rule }) => {
  const data = [
    {
      name: '対局種別',
      value: rule?.playerCount === 4 ? '四麻' : '三麻',
    },
    {
      // TODO: 記録できるようにする
      name: 'ゲーム単位',
      value: '半荘'
    },
    {
      name: 'オカ',
      value: `${rule?.oka}点`,
    },
    {
      name: 'ウマ',
      value: rule?.uma,
    },
    {
      name: 'チップ',
      value: `${rule?.chip}点`,
    },
    {
      name: '飛び賞ボーナス',
      value: `${rule?.killScore}点`,
    },
  ]
  return (
    <div className="flex p-4 m-4 justify-center items-center">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger><Button variant="ghost">ルール</Button></AccordionTrigger>
          <AccordionContent>
            <Table className="table-auto">
              <TableBody>
                {data.map((item) => {
                  return (
                    <TableRow key={`${rule.id}-item.name`}>
                      <TableCell>
                        {item.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.value}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div >
  );
};
