import {
  RankPointFiveTen,
  RankPointOneThree,
  RankPointOneTwo,
  RankPointTwoThree,
  Uma,
} from "~/models/rule";

export const RankPoint = (rank: number, uma: Uma): number => {
  switch (uma) {
    case Uma.FIVETEN:
      return RankPointFiveTen(rank);
    case Uma.ONETWO:
      return RankPointOneTwo(rank);
    case Uma.ONETHREE:
      return RankPointOneThree(rank);
    case Uma.TWOTHREE:
      return RankPointTwoThree(rank);
  }
};
