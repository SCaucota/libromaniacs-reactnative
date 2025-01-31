export const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES').format(price);
}