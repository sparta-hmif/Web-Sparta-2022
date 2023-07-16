"use client";
import { useEffect, useState } from "react";
import NumberTime from "./NumberTime";

const useCountdown = (targetDate: number) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const Countdown = ({
  target,
  pemilihan,
}: {
  target: number;
  pemilihan: string;
}) => {
  const [days, hours, minutes, seconds] = useCountdown(target);
  var dateFormat = new Date(target);
  var date =
    `${Math.floor(dateFormat.getDate() / 10)}${dateFormat.getDate() % 10}` +
    "-" +
    `${Math.floor((dateFormat.getMonth() + 1) / 10)}${
      (dateFormat.getMonth() + 1) % 10
    }` +
    "-" +
    dateFormat.getFullYear() +
    " " +
    `${Math.floor(dateFormat.getHours() / 10)}${dateFormat.getHours() % 10}` +
    ":" +
    `${Math.floor(dateFormat.getMinutes() / 10)}${
      dateFormat.getMinutes() % 10
    }` +
    ":" +
    `${Math.floor(dateFormat.getSeconds() / 10)}${
      dateFormat.getSeconds() % 10
    }`;

  return (
    <>
      <div className="py-3 lg:pt-4 lg:pb-9">
        <p className="sub-1 text-[12px] lg:text-[16px] text-center">
          Kamu baru bisa memilih {pemilihan} pada Tanggal
        </p>
        <p className="sub-1 text-[12px] lg:text-[16px] text-center mb-2 lg:mb-6">
          {date}
        </p>
        <div className="flex gap-2 lg:gap-6 justify-center">
          <NumberTime
            type={"D"}
            value={days + hours + minutes + seconds <= 0 ? 0 : days}
          />
          <NumberTime
            type={"H"}
            value={days + hours + minutes + seconds <= 0 ? 0 : hours}
          />
          <NumberTime
            type={"M"}
            value={days + hours + minutes + seconds <= 0 ? 0 : minutes}
          />
          <NumberTime
            type={"S"}
            value={days + hours + minutes + seconds <= 0 ? 0 : seconds}
          />
        </div>
      </div>
    </>
  );
};

export default Countdown;
