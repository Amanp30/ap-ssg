## Generate Build

To generate the build, run the following command in your terminal using the CLI:

```shell
npx ap-ssg build
```

Alternatively, you can trigger the build programmatically using either .then() or async/await:

### Using `.then()`:

```javascript
const { ssg } = require("ap-ssg");

ssg.generate()
  .then(() => {
    // Perform any actions after the build generation, such as logging or post-processing
  })
  .catch((error) => {
    console.error("Error during build generation:", error);
  });
```

### Using `async/await`:

```javascript
const { ssg } = require("ap-ssg");

async function generateBuild() {
  try {
    await ssg.generate();
    // Perform any actions after the build generation, such as logging or post-processing
  } catch (error) {
    console.error("Error during build generation:", error);
  }
}

generateBuild();
```

## After Build Generation

Once the build process is complete, check the build folder in the root directory of your project. It will contain the
generated static site files, ready for deployment or further processing.




