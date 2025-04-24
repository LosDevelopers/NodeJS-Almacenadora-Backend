import Customer from "../customer/customer.model.js"

export const addCustomers = async (req, res) => {
    try{
        const data = req.body
        const customer = await Customer.create(data)
        return res.status(200).json({
            message: "Customers has been regsitered successfully",
            customer
        })
    }catch(failure){
        return res.status(500).json({
            message: "Failed to register the customers",
            error: failure.message
        })
    }
}

export const customersList = async (req, res) => {
    try{
        const query = {status:true}
        const customers = await Customer.find(query)
        return res.status(200).json(customers)
    }catch(failure){
        return res.status(500).json({
            message: "Failure to obtain the customers",
            error: failure.message
        })
    }
}

export const editCustomers = async (req, res) => {
    try{
        const {cid} = req.params
        const data = req.body
        const customer = await Customer.findByIdAndUpdate(cid, data, {new:true})
        if(!customer){
            return res.status(400).json({
                message: "Costumers successfully updated",
                customer
            })
        }
        return res.status(200).json({
            message: "Category successfully updated",
            customer
        })
    }catch(failure){
        return res.status(500).json({
            message: "Error updating the customers",
            error: failure.message
        })
    }
}

export const deleteCustomer = async (req, res) => {
    try{
        const {cid} = req.params
        const customer = await Customer.findByIdAndUpdate(cid, {status:false}, {new:true})
        return res.status(200).json({
            success: true,
            message: "Customer eliminated",
            customer
        })
    }catch(failure){
        return res.status(500).json({
            success:false,
            message: "Error deleting customers",
            error: failure.message
        })
    }
}