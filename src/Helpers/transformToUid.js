export const transformToUid = (usuario) => {
    const { id, password, ...data } = usuario;
    return { uid: id, ...data };
  };