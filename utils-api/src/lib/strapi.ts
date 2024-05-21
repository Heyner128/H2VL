interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${process.env.PUBLIC_STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const axios = (await import('axios')).default;

  const res = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_STRAPI_API_TOKEN}`,
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
