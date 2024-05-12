import axios from "axios";

declare global {
  interface ImportMeta {
    env: {
      PUBLIC_STRAPI_URL: string;
      PUBLIC_STRAPI_API_TOKEN: string;
    }
  }
}

const { PUBLIC_STRAPI_URL, PUBLIC_STRAPI_API_TOKEN } =  import.meta.env || process.env;

interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${PUBLIC_STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if(value) url.searchParams.append(key, value);
    });
  }
  const res = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${PUBLIC_STRAPI_API_TOKEN}`,
    },
  });
  let data = res.data;
  if (wrappedByKey) {
    data = data[wrappedByKey];
  }
  if (wrappedByList) {
    data = data[0];
  }
  return data as T;

}
