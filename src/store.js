const STORAGE_KEY = "starwars_store_v1";

const loadCache = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

export const initialStore = () => {
  const cached = loadCache();
  const hasData = Boolean(
    cached.people?.length && cached.planets?.length && cached.vehicles?.length
  );

  return {
    people: cached.people || [],
    planets: cached.planets || [],
    vehicles: cached.vehicles || [],
    saved: cached.saved || [],
    isLoaded: hasData,
  };
};

const persist = (store) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      people: store.people,
      planets: store.planets,
      vehicles: store.vehicles,
      saved: store.saved,
    })
  );
};

export default function storeReducer(store, action = {}) {
  let newStore = store;

  switch (action.type) {
    case "set_people":
      newStore = { ...store, people: action.payload };
      break;

    case "set_planets":
      newStore = { ...store, planets: action.payload };
      break;

    case "set_vehicles":
      newStore = { ...store, vehicles: action.payload };
      break;

    case "set_loaded":
      newStore = { ...store, isLoaded: true };
      break;

    case "add_saved": {
      const alreadySaved = store.saved.some(
        (saved) =>
          saved.uid === action.payload.uid &&
          saved.category === action.payload.category
      );
      newStore = alreadySaved
        ? store
        : { ...store, saved: [...store.saved, action.payload] };
      break;
    }

    case "remove_saved":
      newStore = {
        ...store,
        saved: store.saved.filter(
          (saved) =>
            !(saved.uid === action.payload.uid && saved.category === action.payload.category)
        ),
      };
      break;

    default:
      throw Error("Unknown action: " + action.type);
  }

  persist(newStore);
  return newStore;
}