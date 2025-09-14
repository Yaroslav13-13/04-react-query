import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

if (!TOKEN) {
  throw new Error("❌ VITE_TMDB_TOKEN is not defined! Додай його у файл .env");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  query: string,
  page: number = 1
): Promise<MoviesResponse> {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  };

  const response: AxiosResponse<MoviesResponse> = await axiosInstance.get(
    "/search/movie",
    config
  );

  return response.data;
}

export function getImageUrl(path: string | null, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}
export async function fetchPopularMovies(): Promise<Movie[]> {
  const response: AxiosResponse<{ results: Movie[] }> = await axiosInstance.get(
    "/movie/popular",
    { params: { language: "en-US", page: 1 } }
  );
  return response.data.results;
}
