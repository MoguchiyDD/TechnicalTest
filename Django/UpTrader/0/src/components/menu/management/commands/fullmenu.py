from django.core.management.base import BaseCommand
from components.menu.models import Menu, TypeMenu, MenuForParentTabs


class Command(BaseCommand):
    help = "Created menu is populated with data by the program"

    def handle(self, *args, **kwargs):
        menu_type = TypeMenu.objects.get_or_create(menu_type="main")
        menu = (
            ("Дом", "home", None, 10),
            ("Творчество", "creativity", None, 20),
            ("Живописи", "paintings", "creativity", 21),
            ("Субъекты", "subjects", "paintings", 22),
            ("Объекты", "objects", "paintings", 23),
            ("Скульптуры", "sculptures", "creativity", 24),
            ("Информация", "information", None, 30)
        )

        for m in menu:
            parent = None
            if m[2]:
                parent = MenuForParentTabs.objects.get_or_create(parent=m[2])[0]
            tab_menu = Menu.objects.get_or_create(
                menu_type=menu_type[0],
                title=m[0],
                slug=m[1],
                parent=parent,
                level=m[3]
            )

            if tab_menu[1] is True:
              self.stdout.write(
                  self.style.SUCCESS(f"Добавлено вкладка в меню `{m[0]}`")
              )
            else:
              self.stdout.write(
                  self.style.ERROR(f"Вкладка в меню `{m[0]}` уже существует")
              )
