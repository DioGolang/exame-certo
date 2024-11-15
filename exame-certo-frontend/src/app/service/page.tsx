import IndexNavbar from "@/components/Navbars/IndexNavbar";
import IndexHeader from "@/components/Headers/IndexHeader";
import IndexFooter from "@/components/Footer/IndexFooter";
import ServiceContent from "@/components/Content/ServiceContent";

export default function Service() {
    return (
        <>
            <IndexNavbar />
            <IndexHeader />
            <ServiceContent />
            <IndexFooter />
        </>
    );
}