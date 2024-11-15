import IndexNavbar from "@/components/Navbars/IndexNavbar";
import IndexFooter from "@/components/Footer/IndexFooter";
import IndexHeader from "@/components/Headers/IndexHeader";
import IndexContent from "@/components/Content/IndexContent";

export default function Home() {
  return (
      <>
        <IndexNavbar />
        <IndexHeader />
        <IndexContent />
        <IndexFooter />
      </>
  );
}