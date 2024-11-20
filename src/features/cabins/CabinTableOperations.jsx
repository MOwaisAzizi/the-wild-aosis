import TableOperaton from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinOperations(){
    return(
        <TableOperaton>
            <Filter filterField={'discount'} options={[
                {value:'all',label:'All'},
                {value:'no-discount',label:'No-Discount'},
                {value:'with-discount',label:'With-Discount'},
            ]}/>

            <SortBy options ={[
           { value: "startDate-desc", label: "Sort by date (recent first)" },
            { value: "startDate-asc", label: "Sort by date (earlier first)" },
           {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
            />
        </TableOperaton>
    )
}