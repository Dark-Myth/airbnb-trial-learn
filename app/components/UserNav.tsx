/* eslint-disable @next/next/no-img-element */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, MenuIcon } from "lucide-react"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createairbnbhome } from "../actions";



export async function UserNav () {

  const {getUser}=getKindeServerSession();
  const user = await getUser();

  const createairbnbhomeId = createairbnbhome.bind(null,{userId:user?.id as string})
  // since we can't pass the user id directly to the function, we bind it to the function

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>
                  <img src={user?.picture ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} alt="Image of the user" className="rounded-full h-8 w-8 hidden lg:block"/>

            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {user?(
            <>
              <DropdownMenuItem>
                <form className="w-full" action={createairbnbhomeId}>
                  <button type="submit" className="w-full text-start">
                    Airbnb your Home 
                  </button>
                  {/* we will use server action and they will always work on the server */}
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/my-home" className="w-full">
                  {/* the above is the linker 🤦‍♂️ almost forgot */}
                  My Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favourites" className="w-full">
                  My Favourites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/reservstions" className="w-full">
                  My Reservations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <LogoutLink className="w-full">
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </>
          ):(
            <>
              <DropdownMenuItem>
                <RegisterLink className="w-full">
                  Register
                </RegisterLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LoginLink className="w-full">
                    Sign in
                  </LoginLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav