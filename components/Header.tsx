import React, { useEffect, useState } from "react";
import LoginButton from "./LoginLogoutButton";
import UserGreetText from "./UserGreetText";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <div className="flex justify-between items-center text-center justify-center  max-w-[1200px] mx-auto border-b mb-3">
      <ul className="flex items-center gap-8 text-center justify-center">
        <li>
          <UserGreetText />
        </li>
        <li>
          <Button className="text-muted-foreground hover:text-foreground" variant={"link"} onClick={() => router.push("/")}>
            Home
          </Button>{" "}
        </li>
        <li>
          <Button className="text-muted-foreground hover:text-foreground" variant={"link"} onClick={() => {
            if (user) {
              router.push(`/favorites/${user?.id}`);
            } else {
              router.push("/login");
              toast.error("Please login to continue");
            }
          }}>
            Favorites
          </Button>
        </li>
      </ul>
      <ul>
        <li>
          {" "}
          <LoginButton />{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
