from collections import namedtuple

from django.core.management.base import BaseCommand

from components.menu.models import Menu, TypeMenu, MenuForParentTabs


MenuItem = namedtuple('MenuItem', ['title', 'slug', 'parent_slug', 'level'])


class Command(BaseCommand):
    help = "Created menu is populated with data by the program"

    def handle(self, *args, **kwargs):
        menu_type, _ = TypeMenu.objects.get_or_create(menu_type="main")
        items = (
            MenuItem("Дом",        "home",        None,         10),
            MenuItem("Творчество", "creativity",  None,         20),
            MenuItem("Живописи",   "paintings",   "creativity", 21),
            MenuItem("Субъекты",   "subjects",    "paintings",  22),
            MenuItem("Объекты",    "objects",     "paintings",  23),
            MenuItem("Скульптуры", "sculptures",  "creativity", 24),
            MenuItem("Информация", "information", None,         30),
        )

        for item in items:
            parent = None
            if item.parent_slug:
                parent, _ = MenuForParentTabs.objects.get_or_create(
                    parent=item.parent_slug
                )
            _, created = Menu.objects.get_or_create(
                menu_type=menu_type,
                title=item.title,
                slug=item.slug,
                parent=parent,
                level=item.level,
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"Добавлено вкладка в меню `{item.title}`")
                )
            else:
                self.stdout.write(
                    self.style.ERROR(f"Вкладка в меню `{item.title}` уже существует")
                )
