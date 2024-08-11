const isLatitudeValid = (latitude: any): boolean => {
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    return false;
  }
  return true;
};

const isLongitudeValid = (longitude: any): boolean => {
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    return false;
  }
  return true;
};


export {
  isLatitudeValid,
  isLongitudeValid
};
