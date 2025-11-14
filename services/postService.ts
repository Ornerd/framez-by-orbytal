import { supabase } from "@/lib/supabase";
import { uploadFile } from "./imagesService";

export interface User {
  id: string;
  name: string;
  image?: string | null;
}

export interface PostLike {
  id?: string;
  userId: string;
  postId: string;
  created_at?: string;
}

export interface CommentCount {
  count: number;
}

export interface Post {
  id?: string;
  userId: string;
  body?: string | null;
  file?: any; // will refine in Step 2
  created_at?: string;

  // Joined relations
  user?: User;
  postLikes?: PostLike[];
  comments?: CommentCount[];
}

/** API Response Helper */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  msg?: string;
}


export const createOrUpdatePost = async (post: Post): Promise<ApiResponse<Post>> => {
  try {
    // Upload file (image or video)
    if (post.file && typeof post.file === "object") {
      const isImage = post?.file?.type === "image";
      const folderName = isImage ? "postImages" : "postVideos";

      const fileResult = await uploadFile(folderName, post?.file?.uri, isImage);

      if (fileResult.success) {
        post.file = fileResult.data;
      } else {
        return fileResult;
      }
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log("create post error", error);
      return { success: false, msg: "Post creation failed" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("create post error", error);
    return { success: false, msg: "Post creation failed" };
  }
};


export const fetchPosts = async (limit = 10): Promise<ApiResponse<Post[]>> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        user: users (id, name, image),
        postLikes (*),
        comments (count)
      `)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log("fetch post error", error);
      return { success: false, msg: "Couldn't get any posts sorry" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("fetch post error", error);
    return { success: false, msg: "Couldn't get any posts sorry" };
  }
};


export const fetchPostDetails = async (postId: string): Promise<ApiResponse<Post>> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        user: users (id, name, image),
        postLikes (*),
          comments (
            id,
            text,
            created_at,
            user: users (id, name, image)
        )
      `)
      .eq("id", postId)
      .single();

    if (error) {
      console.log("fetchPostDetail error", error);
      return { success: false, msg: "Couldn't get the posts sorry" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("fetchPostDetail error", error);
    return { success: false, msg: "Couldn't get the posts sorry" };
  }
};


export const createPostLike = async (postLike: PostLike): Promise<ApiResponse<PostLike>> => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.log("postLike error", error);
      return { success: false, msg: "Couldn't like the post sorry" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("postLike error", error);
    return { success: false, msg: "Couldn't like the post sorry" };
  }
};

export const removePostLike = async (postId: string, userId: string): Promise<ApiResponse> => {
  try {
    const { error } = await supabase
      .from("postLikes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);

    if (error) {
      console.log("postLike error", error);
      return { success: false, msg: "Couldn't un-like the post sorry" };
    }

    return { success: true };
  } catch (error) {
    console.log("postLike error", error);
    return { success: false, msg: "Couldn't un-like the post sorry" };
  }
};


//  * Create Comment
export const createComment = async (comment: any): Promise<ApiResponse> => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select()
      .single();

    if (error) {
      console.log("comment error", error);
      return { success: false, msg: "Couldn't create a comment sorry" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("comment error", error);
    return { success: false, msg: "Couldn't create a comment sorry" };
  }
};
