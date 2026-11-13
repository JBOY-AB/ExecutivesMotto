export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export const formatMileage = (value: number) =>
  `${new Intl.NumberFormat("en-NG").format(value)} km`;
