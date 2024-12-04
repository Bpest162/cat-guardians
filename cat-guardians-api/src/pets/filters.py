import pendulum
from django.db.models import Q
from django_filters import rest_framework as filters

from api.settings_local import AGE_RANGE_CHOICES, GENDER_CHOICES
from pets.models import CatColor, CatProfile


class CatProfileFilter(filters.FilterSet):
    age__lt = filters.NumberFilter(method="filter_age__lt")
    age__gt = filters.NumberFilter(method="filter_age__gt")
    color__name = filters.ModelMultipleChoiceFilter(
        field_name="color__name", to_field_name="name", queryset=CatColor.objects.all()
    )
    gender = filters.MultipleChoiceFilter(choices=GENDER_CHOICES)
    age_range = filters.MultipleChoiceFilter(choices=AGE_RANGE_CHOICES, method="filter_age_range")

    class Meta:
        model = CatProfile
        fields = ["name", "gender", "color__name", "breed__name", "age__lt", "age__gt", "age_range"]

    @staticmethod
    def get_filter_date(value):
        value = int(value)
        return pendulum.today().subtract(years=value).date()

    def filter_age__lt(self, queryset, name, value):
        filter_date = self.get_filter_date(value)
        return queryset.filter(birth_date__gt=filter_date)

    def filter_age__gt(self, queryset, name, value):
        filter_date = self.get_filter_date(value)
        return queryset.filter(birth_date__lt=filter_date)

    def filter_age_range(self, queryset, name, value):
        age_ranges = {
            "Kitten": Q(birth_date__gte=self.get_filter_date(1)),
            "Junior": Q(birth_date__lt=self.get_filter_date(1), birth_date__gte=self.get_filter_date(3)),
            "Adult": Q(birth_date__lt=self.get_filter_date(3), birth_date__gte=self.get_filter_date(4)),
            "Senior": Q(birth_date__lt=self.get_filter_date(4)),
        }

        queries = Q()
        for v in value:
            queries |= age_ranges.get(v, Q())

        return queryset.filter(queries)
