import os


def get_dev_tools_configuration(env):
    """
    This function returns the configuration for the development tools, such as Django Extensions and Debug Toolbar
    Args:
        env: environ.Env: environment object
    Returns:
        bool: True if the development tools should be enabled, False otherwise
    """
    return os.getenv("ENVIRONMENT") not in ["docker", "gitlab-ci"]
