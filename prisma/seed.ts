import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cuid from "cuid";

async function main() {
  const members = [
    { name: "フナイ", id: "clnfzmrjm0004jzp6xr6rpkc2" },
    { name: "男中田", id: "clnfzmz2f0005jzp69l260bu4" },
    { name: "トシユキ", id: "clnfzn7g60006jzp6qf6gf7p9" },
    { name: "ライキリ", id: "clnfzna0i0007jzp6hsxbulgl" },
    { name: "タニー", id: "clng4l0rg0003jzgs2lr9mi2v" },
    { name: "ハマグチ", id: "clng4ltcm0003jzakaovqiv5l" },
    { name: "タケル", id: "clng4lh2g0003jzvmncqofydw" },
    { name: "kwsk", id: "clng4m30k0007jzp5dazl7cdo" },
  ].map(async (member) => {
    return await prisma.member.upsert({
      where: {
        name: member.name,
        id: member.id,
      },
      update: {},
      create: {
        name: member.name,
      },
    });
  });
  const rule = await prisma.rule.upsert({
    where: {
      id: "clnfz1aoe0000jzp6x6shnnoc",
      rate: 100,
      uma: 2,
      defaultPoint: 25000,
      referencePoint: 30000,
      tip: 2000,
      round: 1,
      killBonus: true,
    },
    update: {},
    create: {
      id: "clnfz1aoe0000jzp6x6shnnoc",
      rate: 100,
      uma: 2,
      defaultPoint: 25000,
      referencePoint: 30000,
      tip: 2000,
      round: 1,
      killBonus: true,
    },
  });

  const parlor = await prisma.parlor.upsert({
    where: {
      id: "clnfz29gl0001jzp60feb1gf8",
    },
    update: {},
    create: {
      name: "サシオギ荘",
    },
  });

  const game = await prisma.game.upsert({
    where: {
      id: "clnfzfnps0003jzp60rrnhnh7",
    },
    update: {},
    create: {
      date: new Date(),
      parlorId: parlor.id,
      name: "第1節",
      ruleId: rule.id,
      headCount: 4,
      seatCost: 0,
    },
  });

  console.log({ rule, members, game, parlor });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
