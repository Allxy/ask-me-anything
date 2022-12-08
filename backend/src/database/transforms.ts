export const idTransform: any = (doc: any, res: any) => {
  res._id = doc.id;
  return res;
};
