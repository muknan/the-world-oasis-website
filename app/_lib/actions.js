"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import isAuth from "./isAuth";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  await isAuth();

  const nationalId = formData.get("nationalId");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regexPattern = /^[a-zA-Z0-9]{6,12}$/;
  if (!regexPattern.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalId };

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await isAuth();

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking!");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const reservationId = Number(formData.get("reservationId"));
  // Authentication
  const session = await isAuth();

  // Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(reservationId))
    throw new Error("You are not allowed to update this booking!");

  // Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
  };

  // Mutation
  await updateBooking(reservationId, updateData);

  // Redirection
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations/");
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
