import Kanban from "@/components/Kanban";
import PageHeader from "@/components/ui/PageHeader";

const KanbanPage = () => {
  return (
    <div>
      <PageHeader>
        <PageHeader.Heading>Profile</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>Kanban</PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <Kanban />
    </div>
  );
};

export default KanbanPage;
