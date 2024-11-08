export const currencies = [
  { value: "SRD", label: "$ SRD", locale: "sr-SR" },
  { value: "EURO", label: "€ Euro", locale: "de-DE" },
  { value: "USD", label: "$ Dollar", locale: "en-US" },
];

export type Currency = (typeof currencies)[0];
