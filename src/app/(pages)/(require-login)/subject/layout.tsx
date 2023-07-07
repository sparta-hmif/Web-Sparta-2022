import DashboardHeader from "@/components/DashboardHeader";

const SubjectPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <DashboardHeader title="SUBJECT" />
      {children}
    </div>
  );
};

export default SubjectPageLayout;
