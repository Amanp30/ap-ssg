import {AddressObject} from "./address";

export interface PersonObject {
    /**
     * The name of the person.
     * Example: "John Doe"
     */
    name: string;

    /**
     * The address of the person (optional).
     * If provided, follows the AddressObject structure.
     */
    address?: AddressObject;

    /**
     * The email address of the person (optional).
     * Example: "johndoe@example.com"
     */
    email?: string;

    /**
     * The gender of the person (optional).
     * Possible values: 'Male', 'Female', 'Nonbinary', 'Other'.
     */
    gender?: 'Male' | 'Female' | 'Nonbinary' | 'Other';

    /**
     * The person's job title or position (optional).
     * Example: "Software Engineer"
     */
    jobTitle?: string;

    /**
     * The birthdate of the person (optional).
     * The date should be in ISO 8601 format: "YYYY-MM-DD".
     * Example: "1990-01-01"
     */
    birthDate?: string;

    /**
     * The nationality of the person (optional).
     * Example: "American"
     */
    nationality?: string;

    /**
     * The URL associated with the person (optional).
     * Example: "https://www.johndoe.com"
     */
    url?: string;

    /**
     * A list of children of the person (optional).
     * Each child is represented by a PersonObject.
     */
    children?: PersonObject[];
}
