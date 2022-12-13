import React from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useFetchResource(url: string) {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsFetching(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => {
        setIsFetching(false);
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, isFetching, error };
}
