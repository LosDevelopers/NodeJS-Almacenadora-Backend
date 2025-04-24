import Customer from "../customer/customer.model.js"

export const customerExists = async (cid = "") => {
    const exist = await Customer.findById(cid)
    if(!exist){
        throw new Error("The customer with the entered id does not exist")
    }
}