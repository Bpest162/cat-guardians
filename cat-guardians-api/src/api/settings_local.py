# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
ALLOWED_HOSTS = ["*"]
LANGUAGE_CODE = "uk-ua"
TIME_ZONE = "Europe/Kiev"
SITE_TITLE = "Cat Guardians"
USER_PAGINATION_PAGE_SIZE = 10
PAGINATION_PAGE_SIZE = 6
SESSION_EXPIRATION_DAYS = 365
REQUEST_TIMEOUT = 5


CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


AUTH_USER_MODEL = "users.CustomUser"
SIGNED_COOKIE_USER_KEY = "userID"
SIGNED_COOKIE_NAME = "master_of_puppets"

# retry  settings
MAX_RETRY_ATTEMPTS = 3
RETRY_WAIT_TIME = 1000

# Pets
BASIC_CAT_BREEDS_LIST = [
    "Mixed-Breed",
    "Mongrel",
    "Siamese",
    "Persian",
    "Maine Coon",
    "Sphynx",
    "Bengal",
    "Ragdoll",
    "British",
    "British Shorthair",
]
BASIC_CAT_COLORS_LIST = ["White", "Black", "Tabby", "Orange", "Gray", "Calico", "Tortoiseshell", "Blue", "Pointed"]
GENDER_CHOICES = (
    ("M", "Male"),
    ("F", "Female"),
)

AGE_RANGE_CHOICES = (("Kitten", "Kitten"), ("Junior", "Junior"), ("Adult", "Adult"), ("Senior", "Senior"))

# Adoption
ADOPTION_STATUS_CHOICES = (
    ("approved", "approved"),
    ("rejected", "rejected"),
    ("pending", "pending"),
    ("completed", "completed"),
)

# Found_form
FORM_STATUS_CHOICES = [
    ("NW", "New"),
    ("PG", "In Progress"),
    ("CP", "Completed"),
]

ADDRESS_FIELD_LENGTH = 100
