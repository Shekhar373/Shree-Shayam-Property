import EditPropertyForm from "@/components/admin/AllProperties/EditPropertyForm";


export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditPropertyForm propertyId={id} />;
}