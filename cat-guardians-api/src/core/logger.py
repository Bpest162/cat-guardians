import logging
import logging.config
import os
from functools import lru_cache

import yaml


class ConfigLogger:
    """Class for setting up a basic logger"""

    current_directory = os.path.dirname(os.path.abspath(__file__))
    config_file_path = os.path.join(current_directory, "config_logging.yml")

    @classmethod
    @lru_cache
    def configure_logger(cls):
        """The method reads settings from the configuration
        file and applies them to the logger"""

        with open(cls.config_file_path, "r") as file:
            config_logging = yaml.safe_load(file)
        logging.config.dictConfig(config_logging["LOGGING"])


class CustomLoggerAdapter(logging.LoggerAdapter):
    """Logging Adapter that adds prefix to the message in '[prefix] msg' format."""

    def __init__(self, logger: logging.Logger | str, prefix, extra=None):
        """Instantiate LoggerAdapter with provided prefix.

        :param logger: logging.Logger: logger object
        :param prefix: str: prefix to use before log message
        :param extra: dict: any extra parameters
        """
        super().__init__(logger if isinstance(logger, logging.Logger) else logging.getLogger(logger), extra)
        self.prefix = prefix if prefix else ""

    def process(self, msg, kwargs):
        return f"[{self.prefix}]  {msg}", kwargs


class LogWrapper:
    """Class wrapper for the root logger with different log adapters."""

    ROOT = logging.getLogger("ROOT")

    FOUND: logging.Logger = CustomLoggerAdapter(ROOT, "Found")
    ADOPTION: logging.Logger = CustomLoggerAdapter(ROOT, "Adoption")
    PETS: logging.Logger = CustomLoggerAdapter(ROOT, "Pets")
    USER: logging.Logger = CustomLoggerAdapter(ROOT, "Users")
    REQUEST: logging.Logger = CustomLoggerAdapter(ROOT, "Request")
    TESTS: logging.Logger = CustomLoggerAdapter(ROOT, "Tests")
