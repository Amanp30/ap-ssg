## Organization Schema

The **Organization Schema** allows you to provide structured data about your organization, improving SEO and enabling
search engines to display rich snippets in search results. You can configure the organization schema in the
`apssg.config.js` file, and it will be automatically added to every page of your website.

### Example Configuration

Here’s an example of an `organization` object:

```javascript
const organization = {
  name: "Your Organization Name", // Name of your organization
  url: "https://myorg.com", // Official website URL
  logo: "https://myorg.com/logo.png", // Logo URL
  email: "support@techprosolutions.com", // Contact email
  sameAs: [
    "https://facebook.com/myorg",
    "https://linkedin.com/myorg"
  ], // Social profiles
  foundingDate: new Date("2024-11-04").toISOString(), // ISO 8601 format
  foundingLocation: "Malpura, India", // Founding location
  address: {
    addressLocality: "Shiv Colony", // Locality
    postalCode: "304502", // Postal code
    streetAddress: "Street 41", // Street address
    addressRegion: "Rajasthan" // State or region
  },
  contactPoint: [
    {
      telephone: "+91 874xxxxx78", // Contact number
      contactType: "customer service", // Type of contact
      availableLanguage: ["English", "French"], // Supported languages
      areaServed: ["US", "CA", "IN"] // Areas served
    }
  ],
  alumni: [
    {
      name: "Jane Smith", // Alumni name
      jobTitle: "Software Engineer", // Current job title
      email: "jane.smith@example.com", // Email address
      birthDate: "1985-03-15", // Date of birth (ISO format)
      telephone: "+1-555-555-1234", // Contact number
      nationality: "Indian", // Nationality
      children: [
        {
          name: "Sophia Smith",
          birthDate: "2010-07-25",
          gender: "Female"
        },
        {
          name: "Lucas Smith",
          birthDate: "2014-09-12",
          gender: "Male"
        }
      ]
    }
  ]
};
```
