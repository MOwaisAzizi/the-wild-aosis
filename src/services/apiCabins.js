import supabase from "./supabase";

 
 export async function gitCabins(){

    let { data, error } = await supabase.from('cabin').select('*')

    if(error){
        console.log(error);
    throw new Error('could not found cabin')
    }

        
   return data
}