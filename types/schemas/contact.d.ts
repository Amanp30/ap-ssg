export interface ContactObject {
    /**
     * The telephone number for contacting.
     * Example: "+1-800-555-1234"
     * Consider using a library like `libphonenumber` for phone number validation.
     */
    telephone: string;

    /**
     * Type of contact (e.g., 'Customer Support', 'Sales', 'Technical Support').
     * This is a plain string, but it's recommended to document possible values.
     */
    contactType: string;

    /**
     * Array of available languages in which support can be provided.
     * Example: ["English", "Spanish"]
     */
    availableLanguage: string[];

    /**
     * The geographic or service area that this contact serves.
     * Example: ["United States", "Canada"]
     */
    areaServed: string[];
}