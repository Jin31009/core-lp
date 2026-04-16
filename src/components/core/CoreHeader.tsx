import SiteHeader from "../shared/SiteHeader";

type Props = {
  setPage: (page: string) => void;
};

export default function CoreHeader({ setPage }: Props) {
  return <SiteHeader setPage={setPage} currentPage="corelp" />;
}
