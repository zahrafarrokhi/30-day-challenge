from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from django.core.management.base import BaseCommand, CommandError
from book.models import Book,Category,Tag
from model_bakery import baker
from author.models import Author
from authentication.models import User
from faker import Faker
from random import randint, choices
class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--count', dest='count', default=1, type=int,
            help='Specifies the number of books.',
        )
        parser.add_argument(
            '--count-authors', dest='count_authors', default=1, type=int,
            help='Specifies the number of books.',
        )

    def handle(self, *args, **options):
        count = options.get('count')
        count_authors = options.get('count_authors')

        myfake = Faker()
        category, created = Category.objects.get_or_create(name="drama",slug="drama")
        authors = [baker.make(
            Author,
            # user__phone_number=myfake.phone_number(),
            first_name = myfake.first_name(),
            last_name = myfake.last_name(),
            phone=myfake.phone_number(),
            description = myfake.paragraph(nb_sentences=3),
            address = myfake.address()
        ) for ind in range(count_authors)]
        tag = baker.make(
            Tag,
            name = myfake.name(),
            slug = myfake.name(),
            active = myfake.boolean()

        )
        for ind in range(count):
            book = baker.make(
                Book,
                name=myfake.name(),
                page_numbers = randint(80,1500),
                Categories = category,
                authors = choices(authors, k=randint(1, min(len(authors), 3))),
                tag =[tag],
            )

