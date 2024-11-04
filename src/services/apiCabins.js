import supabase from "./supabase";

 
 export async function gitCabins(){

    let { data, error } = await supabase.from('cabins').select('*')

    if(error){
        console.log(error);
    throw new Error('could not found cabin')
    }

   return data
}

export async function deleteCabin(id) {
    
const { data,error } = await supabase
.from('cabins')
.delete()
.eq("id", id)

if(error){
    console.log(error);
throw new Error('could not delete cabin')
}

return data
}


export async function createCabin(newCabin) {
    
    const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select()
    
    if(error){
        console.log(error);
    throw new Error('could not create cabin')
    }
    
    return data
    }


