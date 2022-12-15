import PageHeader from "./PageHeader";
import PageHeaderHeading from "./Heading";
import PageHeaderBreadcrumb from "./Breadcrumb";
import PageHeaderBreadcrumbItem from "./BreadcrumbItem";

export default Object.assign(PageHeader, {
  Heading: PageHeaderHeading,
  Breadcrumb: PageHeaderBreadcrumb,
  BreadcrumbItem: PageHeaderBreadcrumbItem,
});
