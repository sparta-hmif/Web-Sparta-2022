import Countdown from "../../desuh/election/components/Coundown";

const CareerPathCountdown = ({ targetDate }: { targetDate: Date }) => {
  const targetDateTime = targetDate.getTime();
  return (
    <>
      <div className="lg:scale-90">
        <Countdown target={targetDateTime} />
      </div>
    </>
  );
};

export default CareerPathCountdown;
