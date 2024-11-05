import supabase, { supabaseUrl } from "./supabase";


export async function gitCabins() {

    let { data, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.log(error);
        throw new Error('could not found cabin')
    }
    return data
}

export async function deleteCabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq("id", id)

    if (error) {
        console.log(error);
        throw new Error('could not delete cabin')
    }

    return data
}

export async function createCabin(newCabin) {
    //name to store in databases
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    //1-Create Cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error);
        throw new Error('could not create cabin')
    }

    //-upload image to storage so the cell in data base get it
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)

    //3- delete the cabin if thare is an error uplading image
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq("id", data.id)
        throw new Error('Cabin image could not be uploaded and the cabin was not created')
    }
    return data
}


