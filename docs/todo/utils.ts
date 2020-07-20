export const isUrl = (value: string) => {
  if (typeof value !== 'string') {
    return false;
  }
  const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;
  return reg.test(value);
};
