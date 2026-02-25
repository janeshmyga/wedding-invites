import { notFound } from "next/navigation";
import { getGuestBySlug, getSharedPhotos, getAllSlugs } from "@/lib/guests";
import { WeddingSlider } from "@/components/ui/wedding-slider";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ guest: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guest: string }>;
}) {
  const { guest: slug } = await params;
  const guest = getGuestBySlug(slug);
  if (!guest) return { title: "Приглашение не найдено" };
  return {
    title: `${guest.name}, приглашаем на нашу свадьбу!`,
    description: "Персональное приглашение на свадьбу",
  };
}

export default async function GuestPage({
  params,
}: {
  params: Promise<{ guest: string }>;
}) {
  const { guest: slug } = await params;
  const guest = getGuestBySlug(slug);
  if (!guest) notFound();

  const sharedPhotos = getSharedPhotos();

  return (
    <WeddingSlider
      guestName={guest.name}
      guestMeetingDescription={guest.meetingDescription}
      guestMeetingPhoto={guest.meetingPhoto}
      guestPersonalSlidePosition={guest.personalSlidePosition ?? 4}
      sharedPhotos={sharedPhotos}
    />
  );
}
