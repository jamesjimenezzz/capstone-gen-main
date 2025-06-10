"use client"

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCheckAuth = () => { 
    const router = useRouter();
    const supabase = createClient();

    const checkAuthAndRedirect = async () => {
        const {data: {user}} = await supabase.auth.getUser();

        if (!user) { 
            toast.error("Please login to continue");
            router.push("/login");
            return null;
        }

        return user;
    }

    return {checkAuthAndRedirect};
}