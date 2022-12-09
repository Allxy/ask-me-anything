export const idTransform: any = (doc: any, res: any) => {
  res._id = doc.id;
  return res;
};

export const anyTransform = function (keys: String[]) {
  return (doc: any, res: any) => {
    keys.forEach((key) => {
      res[key as keyof typeof res] = doc[key as keyof typeof doc].toString();
    });
    return res;
  };
};
