import guestsData from "@/data/guests.json";

export interface Guest {
  slug: string;
  name: string;
  meetingDescription: string;
  meetingPhoto: string;
}

export interface SharedPhotos {
  childhood: string;
  firstMeeting: string;
  travel: string;
  proposal: string;
  wedding: string;
}

export interface GuestsData {
  sharedPhotos: SharedPhotos;
  guests: Guest[];
}

export function getAllGuests(): Guest[] {
  return (guestsData as GuestsData).guests;
}

export function getGuestBySlug(slug: string): Guest | undefined {
  return getAllGuests().find((g) => g.slug === slug);
}

export function getSharedPhotos(): SharedPhotos {
  return (guestsData as GuestsData).sharedPhotos;
}

export function getAllSlugs(): string[] {
  return getAllGuests().map((g) => g.slug);
}
