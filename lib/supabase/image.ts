import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const uploadImage = async (dataUrl: string, username: string) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");

    const response = await fetch(dataUrl);
    const imageBlob = await response.blob();

    const ext = imageBlob.type.split("/")[1];
    const path = `${username}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("ticket-images")
      .upload(path, imageBlob, {
        upsert: true,
        contentType: imageBlob.type,
        cacheControl: "86000",
        metadata: {
          owner: user.id,
        },
      });

    if (uploadError) throw uploadError;

    const { error: insertError } = await supabase
      .from("tickets")
      .upsert([{ id: user.id }]);

    if (insertError) throw insertError;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw error;
  }
};
