export const fetchGraphQL = async (query: string) => {
  const response = await fetch("https://prod.backend.prop.house/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  return response.json();
};
