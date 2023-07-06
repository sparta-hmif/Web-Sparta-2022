export default function fetcher(url: string) {
  return fetch(url, {
    credentials: "include",
  }).then((res) => res.json());
}
