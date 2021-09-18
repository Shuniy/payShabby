// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

export const formatPrice = (price) => {
  return formatter.format(price);
};

export const formatDate = (date) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formatedDate = new Date(date);
  return formatedDate.toLocaleDateString("en-US", options);
};
