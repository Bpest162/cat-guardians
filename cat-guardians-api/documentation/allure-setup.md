# Setting Up Allure for Test Reporting

[Allure](https://docs.qameta.io/allure/) is a powerful open-source test report framework that creates detailed and
interactive test reports. It supports multiple programming languages and test frameworks, making it an excellent choice
for tracking and analyzing test results.

## Installation

Before getting started with Allure, ensure you
have [Java Development Kit (JDK)](https://www.oracle.com/cis/java/technologies/downloads/) installed on your system.

To [install](https://docs.qameta.io/allure/#_installing_a_commandline) Allure, you can use package managers
like [Scoop](https://scoop.sh/) for Windows or [Homebrew](https://brew.sh/) for macOS. Alternatively, you can download
it from the official [Allure GitHub repository](https://github.com/allure-framework/allure2/releases) and add it to your
system's PATH.

## Configuring Allure for your Project

To configure Allure for your project, follow these steps:

1. Install the Allure Framework.
2. Add Allure annotations, titles, and steps to your test cases.

### Adding Allure Annotations, Titles, and Steps

To maximize the benefits of Allure reporting, make sure to add appropriate annotations, titles, and steps to your test
cases. This allows Allure to create detailed and interactive reports for each test execution.

- **Annotations**: Annotations provide additional information about the test case. For example, you can
  use `@allure.feature` to specify the feature being tested and `@allure.story` to describe the user story or scenario.

- **Titles**: A clear and descriptive title `@allure.title` for each test case helps in understanding the purpose of the
  test.

- **Steps**: Break down the test case into individual steps and add them using `allure.step()`. This provides a detailed
  trace of the test execution, making it easier to identify where the test failed.

By following these practices, you'll ensure that your Allure reports are informative and provide valuable insights into
your test suite.

## Running Tests and Generating Reports

The Allure reports are automatically generated after running the tests. You can find the generated reports in
the `allure_results` directory.

## Viewing Allure Reports

```bash
allure serve allure_results
```
