import { supabase } from "@/lib/supabase";
import { uploadFile } from "./imagesService";

export const createOrUpdatePost = async (post) => {
    try {
        //upload image
        if(post.file && typeof post.file == 'object') {
            let isImage = post?.file?.type == 'image';
            let folderName = isImage? 'postImages': 'postVideos'
            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage)
            if(fileResult.success) post.file = fileResult.data;
            else {
                return fileResult;
            }
        }
                
        const {data, error} = await supabase
        .from('posts')
        .upsert(post)
        .select()
        .single();

        if (error) {
            console.log('create post error', error);
            return {success: false, msg: 'Post creation failed'}
        }
        return {success: true, data: data}
    } catch (error) {
        console.log('create post error', error);
        return {success: false, msg: 'Post creation failed'}
    }
}
export const fetchPosts= async (limit=10) => {
    try {
       const {data, error} = await supabase
       .from('posts')
       .select(`
        *,
        user: users (id, name, image),
        postLikes (*)
        `)
       .order('created_at', {ascending: false})
       .limit(limit);

       if(error){
          console.log('fetch post error', error);
        return {success: false, msg: "Couldn't get any posts sorry"}
       }
       return {success: true, data: data}
    } catch (error) {
        console.log('fetch post error', error);
        return {success: false, msg: "Couldn't get any posts sorry"}
    }
}
export const fetchPostDetails= async (postId) => {
    try {
       const {data, error} = await supabase
       .from('posts')
       .select(`
        *,
        user: users (id, name, image),
        postLikes (*),
        comments (count)
        `)
       .eq('id', postId)
       .single()

       if(error){
          console.log('fetchPostDetail error', error);
        return {success: false, msg: "Couldn't get the posts sorry"}
       }
       return {success: true, data: data}
    } catch (error) {
        console.log('fetchPostDetail error', error);
        return {success: false, msg: "Couldn't get the posts sorry"}
    }
}


export const createPostLike = async (postLike) => {
    try {
      
        const {data, error} = await supabase 
        .from('postLikes')
        .insert(postLike)
        .select()
        .single()

       if(error){
          console.log('postLike error', error);
        return {success: false, msg: "Couldn't like the post sorry"}
       }
       return {success: true, data: data}
    } catch (error) {
        console.log('postLike error', error);
        return {success: false, msg: "Couldn't like the post sorry"}
    }
}
export const removePostLike = async (postId, userId) => {
    try {
      
        const {error} = await supabase 
        .from('postLikes')
        .delete()
        .eq('userId', userId)
        .eq('postId', postId)

       if(error){
          console.log('postLike error', error);
        return {success: false, msg: "Couldn't un-like the post sorry"}
       }
       return {success: true}
    } catch (error) {
        console.log('postLike error', error);
        return {success: false, msg: "Couldn't un-like the post sorry"}
    }
}


export const createComment = async (comment) => {
    try {
      
        const {data, error} = await supabase 
        .from('comments')
        .insert(comment)
        .select()
        .single()

       if(error){
          console.log('comment error', error);
        return {success: false, msg: "Couldn't create a comment sorry"}
       }

       return {success: true, data: data}
    } catch (error) {
        console.log('comment error', error);
        return {success: false, msg: "Couldn't create a comment sorry"}
    }
}