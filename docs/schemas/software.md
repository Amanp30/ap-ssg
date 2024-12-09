## Software Schema

The **Software Schema** is designed to represent software applications or tools. This schema provides detailed metadata
about the software, including its repository, version, license, supported operating systems, and more. It enhances
search engine understanding and visibility for software-related content.

### Example Configuration

Below is an example configuration for a `pageConfig` object using the **Software Schema**:

```javascript
const pageConfig = {
  // other configuration fields
  type: "software", // Specify the type as "software"
  keywords: "some keywords", // Comma-separated keywords for SEO
  author: {
    name: "Aman Pareek", // Author's name
    url: "https://amanpareek.in" // Author's profile or website
  },
  softwareRepository: {
    url: "https://github.com/ap-utils", // Repository URL
    branch: "master" // Branch name
  },
  softwareVersion: "1.0.0", // Current version of the software
  softwareLicense: "MIT", // License type
  softwareOperatingSystem: "All", // Supported operating systems
  softwarePlatform: "Other" // Platform the software is compatible with
};
