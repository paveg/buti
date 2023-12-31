export const DefaultQuantity = 20;
export enum Uma {
  FIVETEN = 0,
  ONETWO = 1,
  ONETHREE = 2,
  TWOTHREE = 3,
}

export enum Round {
  QUATERROUND = 0, // 東風
  HALFROUND = 1, // 半荘
  FULLROUND = 2, // 一荘
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
    default:
      throw new Error("Not found uma string");
  }
};

export const RoundStrings = (round: Round) => {
  switch (round) {
    case Round.QUATERROUND:
      return "東風";
    case Round.HALFROUND:
      return "半荘";
    default:
      throw new Error("Not found round");
  }
};

export const RateStrings = (rate: number) => {
  switch (rate) {
    case 0:
      return "ノーレート";
    case 10:
      return "テンイチ";
    case 20:
      return "テンニ";
    case 30:
      return "テンサン";
    case 50:
      return "テンゴ";
    case 100:
      return "テンピン";
    default:
      throw new Error("Not found rate string");
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
    default:
      throw new Error("Not found rank");
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
    default:
      throw new Error("Not found rank");

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
    default:
      throw new Error("Not found rank");
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
    default:
      throw new Error("Not found rank");
  }
};
