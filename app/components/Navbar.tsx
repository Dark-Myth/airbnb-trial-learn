import Image from "next/image";
import Link from "next/link";
import DesktopLogo from '../../public/airbnb-desktop.png'
import MobileLogo from '../../public/airbnb-mobile.webp'
import UserNav from "./UserNav";
import { SearchModelComponent } from "./SearchComponent";

export function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto lg:px-10 py-5 px-auto">
                <Link href="/">
                    <Image src={DesktopLogo} alt="Desktop Logo" className="w-32 hidden lg:block" />
                    <Image src={MobileLogo} alt="Mobile Logo" className="w-12 block lg:hidden " />
                </Link> 
                <SearchModelComponent />
                <UserNav/>
            </div>
        </nav>
    );
}

export default Navbar;