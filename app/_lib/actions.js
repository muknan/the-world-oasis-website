"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { deleteBooking, getBookings, updateGuest } from "./data-service";
import isAuth from "./isAuth";

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

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
