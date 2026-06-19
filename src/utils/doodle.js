const doodleModules = import.meta.glob('../assets/doodles/*.svg', { query: '?url', import: 'default', eager: true });

const doodles = Object.values(doodleModules);

export const getRandomDoodle = () => {
  if (doodles.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * doodles.length);
  return doodles[randomIndex];
};
