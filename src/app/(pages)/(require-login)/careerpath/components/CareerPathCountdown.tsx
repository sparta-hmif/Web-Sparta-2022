import dynamic from "next/dynamic";

const CareerPathCountdown = ({ targetDate }: { targetDate: Date }) => {
  const targetDateTime = targetDate.getTime();
  const DynamicCountdown = dynamic(
    () => import("@/components/pemilihan-desuh/components/Coundown"),
    { ssr: false }
  );
  return (
    <>
      <div className="lg:scale-90">
        <DynamicCountdown target={targetDateTime} pemilihan="Career Path" />
      </div>
    </>
  );
};

export default CareerPathCountdown;
