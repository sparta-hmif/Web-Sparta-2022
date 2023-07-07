import DashboardHeader from "@/components/DashboardHeader";

const AssignmentPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-fit overflow-x-hidden">
      <DashboardHeader title="ASSIGNMENTS" />
      {children}
    </div>
  );
};

export default AssignmentPageLayout;
