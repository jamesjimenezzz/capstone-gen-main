"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);
  if (user !== null) {
    console.log(user);
    return (
      <p className="font-bold">{user.user_metadata.full_name ?? "user"}</p>
    );
  }
  return <p></p>;
};

export default UserGreetText;
