import { ref, getStorage, getDownloadURL } from "firebase/storage";

import { app } from "src/context/firebase.context";

const storage = getStorage(app);
export async function get_image_by_path(path){
    const storageRef = ref(storage, `/${path}`);
    const url = await getDownloadURL(storageRef)
    return url
}