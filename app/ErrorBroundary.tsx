export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div>
      <h1>An error occurred</h1>
      <p>{error.message}</p>
    </div>
  );
}
