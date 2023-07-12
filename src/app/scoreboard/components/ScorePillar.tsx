import Pillar from "./Pillar";

interface PillarProps {
  users: {
    rank: number;
    name: string;
    nim: string;
    score: number;
    image?: string;
  }[];
}

const ScorePillar: React.FC<PillarProps> = ({ users }) => {
  return (
    <div className="relative w-full lg:w-2/3 flex-1 mx-auto">
      {users.map((user) => (
        <Pillar
          key={user.nim}
          {...user}
          order={user.rank}
        />
      ))}
    </div>
  );
};

export default ScorePillar;