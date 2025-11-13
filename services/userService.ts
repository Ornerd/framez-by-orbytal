import { supabase } from "@/lib/supabase";

export const getUserData = async (userId: any)=> {
    try {
        const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', userId)
        .single();

        if(error) {
            return {success: false, msg: error.message}
        }

        return {succcess: true, data}

    } catch (error: any) {
        return {success: false, msg: error&& error.message}
    }
}
export const updateUser = async (userId: any, data: any)=> {
    try {
        const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', userId)

        if(error) {
            return {success: false, msg: error.message}
        }

        return {success: true, data}

    } catch (error: any) {
        return {success: false, msg: error&& error.message}
    }
}