export const getImageUrl = (subfolder, imageName) => {
  return `${import.meta.env.BASE_URL}images/${subfolder}/${imageName}`;
};