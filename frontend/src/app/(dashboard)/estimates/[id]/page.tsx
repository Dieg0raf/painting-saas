import { ViewEstimateClient } from "@/components/Estimates/View/ViewEstimateClient";
export default async function ViewEstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`Viewing estimate ${id}`);
  return <ViewEstimateClient id={id} />;
}
