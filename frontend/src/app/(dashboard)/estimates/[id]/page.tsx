export default async function ViewEstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`Viewing estimate ${id}`);
  return (
    <div>
      <h1>View Estimate {id}</h1>
    </div>
  );
}
