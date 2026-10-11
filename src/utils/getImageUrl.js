export const getImageUrl = (subfolder, imageName) => {
  // Si import.meta.env.BASE_URL es solo '/', usa '/nombre-del-repositorio/'
  const baseUrl = import.meta.env.BASE_URL === '/' ? '/mi_ludoteca/' : import.meta.env.BASE_URL;
  return `${baseUrl}images/${subfolder}/${imageName}`;
};