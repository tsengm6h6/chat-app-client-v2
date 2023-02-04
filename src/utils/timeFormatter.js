export const timeFormatter = (time) => {
  return time ? time.split('T')[1].split(':')[0] + ':' + time.split('T')[1].split(':')[1] : time;
};
