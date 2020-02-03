const projectID = 'today-s-school-meal';
const PORT = '5000';

export enum Env {
  Production,
  Development,
}

export const getUri = (): string => {
  const ENV =
    process.env.NODE_ENV === 'development' ? Env.Development : Env.Production;
  switch (ENV) {
    case Env.Development:
      return `http://localhost:${PORT}/${projectID}/us-central1/api`;
    case Env.Production:
      return `https://us-central1-${projectID}.cloudfunctions.net/api`;
  }
};
