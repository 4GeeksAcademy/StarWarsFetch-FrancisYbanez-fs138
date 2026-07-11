const BASE_URL = "https://www.swapi.tech/api";


const getDetail = async (resource, uid) => {
  const response = await fetch(`${BASE_URL}/${resource}/${uid}`);
  if (!response.ok) throw new Error(`No se pudo obtener ${resource}/${uid}`);
  const data = await response.json();

  return {
    uid: data.result.uid,
    ...data.result.properties,
    description: data.result.description,
  };
};


const getList = async (resource) => {
  const response = await fetch(`${BASE_URL}/${resource}?page=1&limit=10`);
  if (!response.ok) throw new Error(`No se pudo obtener la lista de ${resource}`);
  const data = await response.json();

  return Promise.all(data.results.map((entry) => getDetail(resource, entry.uid)));
};

export const getPeople = () => getList("people");
export const getPlanets = () => getList("planets");
export const getVehicles = () => getList("vehicles");


export const getPersonDetail = (uid) => getDetail("people", uid);
export const getPlanetDetail = (uid) => getDetail("planets", uid);
export const getVehicleDetail = (uid) => getDetail("vehicles", uid);

const IMAGE_BASE = "https://starwars-visualguide.com/assets/img";
export const PLACEHOLDER_IMAGE = "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#1a1a1a"/>
      <text x="50%" y="50%" fill="#ffc107" font-size="24" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">
        Sin imagen disponible
      </text>
    </svg>
  `);

const categoryFolder = {
  people: "characters",
  planets: "planets",
  vehicles: "vehicles",
};

export const getImageUrl = (category, uid) =>
  `${IMAGE_BASE}/${categoryFolder[category]}/${uid}.jpg`;