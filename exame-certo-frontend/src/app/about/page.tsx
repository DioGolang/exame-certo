import IndexNavbar from "@/components/Navbars/IndexNavbar";
import IndexHeader from "@/components/Headers/IndexHeader";
import IndexFooter from "@/components/Footer/IndexFooter";
import AboutContent from "@/components/Content/AboutContent";


export default function About() {
    return(
        <>
            <IndexNavbar />
            <IndexHeader />
            <AboutContent />
            <IndexFooter />
        </>
    );
}