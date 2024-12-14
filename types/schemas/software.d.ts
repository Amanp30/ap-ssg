export interface Software {
  type?: "software";

  /**
   * Details about the software repository, including URL and branch.
   */
  softwareRepository?: {
    /**
     * URL of the software repository (e.g., GitHub repository URL).
     * Example: "https://github.com/user/repository"
     */
    url: string;

    /**
     * The branch of the repository (e.g., 'main' or 'master').
     * Example: "main"
     */
    branch: string;
  };

  /**
   * The version of the software.
   * Example: "1.0.0"
   */
  softwareVersion?: string;

  /**
   * The software's license type.
   * Possible values: 'MIT', 'GPL-3.0', 'Apache-2.0', 'BSD-3-Clause', or 'Proprietary'.
   */
  softwareLicense?:
    | "MIT"
    | "GPL-3.0"
    | "Apache-2.0"
    | "BSD-3-Clause"
    | "Proprietary";

  /**
   * The operating system(s) the software supports.
   * Possible values: 'Windows', 'Linux', 'macOS', 'iOS', 'Android', 'All', or 'other'.
   */
  softwareOperatingSystem?:
    | "Windows"
    | "Linux"
    | "macOS"
    | "iOS"
    | "Android"
    | "All"
    | "other";

  /**
   * The platform(s) the software runs on.
   * Possible values: 'Web', 'Mobile', 'Desktop', 'Server', 'IoT', or 'Other'.
   */
  softwarePlatform?: "Web" | "Mobile" | "Desktop" | "Server" | "IoT" | "Other";
}
