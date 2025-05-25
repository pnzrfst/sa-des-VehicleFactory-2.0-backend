type createProductionType = {
    vehicleProduced: string,
    quantity: number,
    dateStart: Date
     vehicleComposition: {
        productId: string,
        quantityPerVehicle: number
    }[]
}