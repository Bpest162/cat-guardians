# Installing and Configuring pre-commit

## Introduction

`pre-commit` is a versatile tool that automatically checks your code for issues before each commit. This ensures consistency, enforces coding standards, and improves the overall quality of your project. This guide will walk you through the steps to install and configure `pre-commit` for your project.

## Prerequisites

Make sure you have :

 -  Python
 -  Poetry
 -  Git

 installed on your system before proceeding with the installation.

## Step 1: Installation

Open your terminal or command prompt and run the following command to install `pre-commit`:

    `poetry install pre-commit`

command to check:

    `pre-commit --version`


## Step 2: Installing pre-commit Hooks

In your terminal, navigate to the root directory of your project and run the following command to install the pre-commit hooks:

    `pre-commit install --hook-type commit-msg --hook-type pre-push --hook-type pre-commit`


This command will set up the Git hooks to run before each commit.


## Step 3: Test pre-commit

Run:

    git add .pre-commit-config.yaml

You can now test the `pre-commit` setup by making some changes to your code and attempting to commit. The hooks will automatically run and check your code for any issues. If any issues are found, `pre-commit` will stop the commit process and display the errors.

## Conclusion

Congratulations! You have successfully installed and configured `pre-commit` for your project. This powerful tool will help you maintain code consistency, improve code quality, and catch potential issues before they become problems.

For more information and customization options, visit the official `pre-commit` [documentation](https://pre-commit.com/)
