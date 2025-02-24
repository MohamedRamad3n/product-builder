export const productValidation = (product: { title: string, description: string, price: string, imageURL: string }) => {
    const errors: { title: string; description: string; price: string; imageURL: string } = {
        title: "",
        description: "",
        price: "",
        imageURL: ""
    };
    const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i;
    if (!product.title.trim() || product.title.length < 6 || product.title.length > 80) {
        errors.title = "Product Title Must Be Between 6 and 80 Characters"
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 800) {
        errors.description = "Product description Must Be Between 10 and 80 Characters"
    }
    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid Price Is Required!"
    }
    if (!product.imageURL.trim() || !imageUrlRegex) {
        errors.imageURL = "Valid ImageUrl Is Required!"
    }
    return errors
}  