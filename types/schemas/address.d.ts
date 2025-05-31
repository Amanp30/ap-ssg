interface AddressObject {
  /**
   * The locality (city or town) of the address.
   * Example: "New York"
   */
  addressLocality?: string;

  /**
   * The postal code or zip code of the address.
   * Example: "10001"
   */
  postalCode?: string;

  /**
   * The street address or the primary address line.
   * Example: "123 Main St"
   */
  streetAddress?: string;

  /**
   * The region (state or province) of the address.
   * Example: "New York"
   */
  addressRegion?: string;

  /**
   * The country of the address.
   * Example: "United States"
   */
  country?: string;
}

export = AddressObject;
