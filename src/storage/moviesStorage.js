import Movie from "../models/movie";
import { movies as seedMovies } from "../data/movies.js";

const STORAGE_KEY = "movie-seat-book.movies.v1";

const readRawMovies = () => {
  try {
    const json = sessionStorage.getItem(STORAGE_KEY);
    if (!json) return null;

    const data = JSON.parse(json);
    if (!Array.isArray(data)) return null;

    // Normalisera id/price till number
    return data.map((m) => ({
      id: Number(m.id),
      name: String(m.name ?? ""),
      price: Number(m.price),
    }));
  } catch {
    return null;
  }
};

const writeRawMovies = (movies) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

const ensureSeeded = () => {
  const existing = readRawMovies();
  if (existing && existing.length > 0) return;
  writeRawMovies(seedMovies);
};

export const getMovies = () => {
  ensureSeeded();
  return readRawMovies().map((m) => new Movie(m.id, m.name, m.price));
};

export const createMovie = ({ name, price }) => {
  ensureSeeded();
  const list = readRawMovies();

  const nextId = list.reduce((maxId, m) => Math.max(maxId, m.id), 0) + 1;

  const newMovie = {
    id: nextId,
    name: String(name).trim(),
    price: Number(price),
  };

  writeRawMovies([...list, newMovie]);
  return new Movie(newMovie.id, newMovie.name, newMovie.price);
};

export const updateMovie = ({ id, name, price }) => {
  ensureSeeded();
  const list = readRawMovies();

  const movieId = Number(id);
  const index = list.findIndex((m) => m.id === movieId);
  if (index === -1) {
    throw new Error("Filmen finns inte");
  }

  const updated = {
    ...list[index],
    name: String(name).trim(),
    price: Number(price),
  };

  const newList = [...list];
  newList[index] = updated;
  writeRawMovies(newList);

  return new Movie(updated.id, updated.name, updated.price);
};

export const deleteMovie = (id) => {
  ensureSeeded();
  const movieId = Number(id);
  const list = readRawMovies();
  writeRawMovies(list.filter((m) => m.id !== movieId));
};

// Valfritt (bra för felsökning)
export const resetMoviesToSeed = () => {
  writeRawMovies(seedMovies);
};