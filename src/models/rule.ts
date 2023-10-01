export const DefaultQuantity = 20;
export enum Uma {
  FIVETEN = 0,
  ONETWO = 1,
  ONETHREE = 2,
  TWOTHREE = 3,
}

export enum Round {
  ONEROUND = 0, // 東風
  HALFROUND = 1, // 半荘
}

export const UmaStrings = (uma: Uma) => {
  switch (uma) {
    case Uma.FIVETEN:
      return "5-10";
    case Uma.ONETWO:
      return "10-20";
    case Uma.ONETHREE:
      return "10-30";
    case Uma.TWOTHREE:
      return "20-30";
  }
};

export const RoundStrings = (round: Round) => {
  switch (round) {
    case Round.ONEROUND:
      return "東風";
    case Round.HALFROUND:
      return "半荘";
  }
};

export const RankPointFiveTen = (rank: number): number => {
  switch (rank) {
    case 1:
      return 10000;
    case 2:
      return 5000;
    case 3:
      return -5000;
    case 4:
      return -10000;
  }
};
export const RankPointOneTwo = (rank: number): number => {
  switch (rank) {
    case 1:
      return 20000;
    case 2:
      return 10000;
    case 3:
      return -10000;
    case 4:
      return -20000;
  }
};
export const RankPointOneThree = (rank: number): number => {
  switch (rank) {
    case 1:
      return 30000;
    case 2:
      return 10000;
    case 3:
      return -10000;
    case 4:
      return -30000;
  }
};
export const RankPointTwoThree = (rank: number): number => {
  switch (rank) {
    case 1:
      return 30000;
    case 2:
      return 20000;
    case 3:
      return -20000;
    case 4:
      return -30000;
  }
};
