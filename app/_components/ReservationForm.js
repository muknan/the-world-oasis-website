"use client";

import { differenceInDays, format } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import Button from "./Button";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const dateFormat = "MMMM, dd yyyy";

  // let dateFrom, dateTo;
  // if (range.from !== undefined) {
  //   dateFrom = format(range.from, dateFormat);
  // }
  // if (range.to !== undefined) {
  //   dateTo = format(range.to, dateFormat);
  // }

  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationData = createReservation.bind(null, reservationData);

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* {range.from && range.to ? (
        <p>
          {format(range.from, dateFormat)} to {format(range.to, dateFormat)}
        </p>
      ) : (
        <p>Your reservation dates</p>
      )} */}

      <form
        // action={createReservationData}
        action={async (formData) => {
          await createReservationData(formData);
          resetRange();
        }}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <Button pendingLabel="in progress...">Reserve now</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
