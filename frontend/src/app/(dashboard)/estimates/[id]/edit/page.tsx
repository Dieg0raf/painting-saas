import { EditEstimateClient } from "@/components/Estimates/Edit/EditEstimateClient";

export default async function EditEstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditEstimateClient id={id} />;
}
