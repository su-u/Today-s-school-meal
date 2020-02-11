export type weekLaunch = {
  mon: schoolMeal;
  tue: schoolMeal;
  wed: schoolMeal;
  thu: schoolMeal;
  fri: schoolMeal;
  sat: schoolMeal;
};

export type schoolMeal = {
  date: string;

  launchA: string;
  launchB: string;
  launchC: string[];
  dailySalad: string;
  gourmetCurry: string;

  createDate: string;
};
