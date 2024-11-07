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
//id just for editing is need
export async function createEditCabin(newCabin,id) {
    //for editing is need , it has path whin you do not reChoise an image(it is already saved in data base)
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    //name to store in databases
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    
    //1-Create Cabin
      //before aditing   const { data, error } = await supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]).select()
        //create/update
        let query = supabase.from('cabins')
  
        //1-create
         if(!id)
          query = query.insert([{ ...newCabin, image: imagePath }])

        //2-edit
         if(id) query = query.update({...newCabin,image:imagePath}).eq('id', id)

        // .from('cabins')
        // .update({ other_column: 'otherValue' })
        // .eq('some_column', 'someValue')
        // .select()
      const { data, error } = await query.select()

    if (error) {
        console.log(error);
        throw new Error('could not create cabin')
    }

    if(hasImagePath) return data
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


